#!/usr/bin/env python3
from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path


LETTER = (612.0, 792.0)  # points (8.5 x 11 in)


def pdf_escape(text: str) -> str:
    return (
        text.replace("\\", "\\\\")
        .replace("(", "\\(")
        .replace(")", "\\)")
        .replace("\r\n", "\n")
        .replace("\r", "\n")
    )


def wrap_words(text: str, max_chars: int) -> list[str]:
    words = text.split()
    if not words:
        return [""]

    lines: list[str] = []
    current: list[str] = []
    for word in words:
        trial = (" ".join(current + [word])).strip()
        if not current or len(trial) <= max_chars:
            current.append(word)
            continue
        lines.append(" ".join(current))
        current = [word]
    if current:
        lines.append(" ".join(current))
    return lines


@dataclass
class TextStyle:
    font: str
    size: float
    leading: float


class OnePageLayout:
    def __init__(self, page_size: tuple[float, float] = LETTER):
        self.page_width, self.page_height = page_size
        self.margin_x = 54.0
        self.margin_top = 54.0
        self.margin_bottom = 54.0

        self.y = self.page_height - self.margin_top
        self.commands: list[str] = []

    def _draw_text(self, text: str, x: float, y: float, style: TextStyle) -> None:
        safe = pdf_escape(text)
        self.commands.append(
            "BT "
            f"/{style.font} {style.size:.2f} Tf "
            f"1 0 0 1 {x:.2f} {y:.2f} Tm "
            f"({safe}) Tj "
            "ET"
        )

    def _ensure_space(self) -> None:
        if self.y < self.margin_bottom:
            raise RuntimeError(
                "Layout overflow: content does not fit on a single page."
            )

    def spacer(self, height: float) -> None:
        self.y -= height
        self._ensure_space()

    def title(self, text: str) -> None:
        style = TextStyle(font="F1", size=18, leading=22)
        self._draw_text(text, self.margin_x, self.y, style)
        self.y -= 26
        self._ensure_space()

    def heading(self, text: str) -> None:
        style = TextStyle(font="F1", size=12, leading=14)
        self._draw_text(text, self.margin_x, self.y, style)
        self.y -= 16
        self._ensure_space()

    def paragraph(self, text: str, max_chars: int = 92) -> None:
        style = TextStyle(font="F2", size=10, leading=12)
        for line in wrap_words(text, max_chars=max_chars):
            self._draw_text(line, self.margin_x, self.y, style)
            self.y -= style.leading
            self._ensure_space()
        self.spacer(6)

    def bullets(self, items: list[str], max_chars: int = 90) -> None:
        style = TextStyle(font="F2", size=10, leading=12)
        bullet_x = self.margin_x
        cont_x = self.margin_x + 14

        for item in items:
            lines = wrap_words(item, max_chars=max_chars)
            if not lines:
                continue
            first = f"- {lines[0]}"
            self._draw_text(first, bullet_x, self.y, style)
            self.y -= style.leading
            self._ensure_space()

            for cont in lines[1:]:
                self._draw_text(cont, cont_x, self.y, style)
                self.y -= style.leading
                self._ensure_space()

        self.spacer(6)


def build_pdf_single_page(content_stream: bytes, page_size: tuple[float, float]) -> bytes:
    page_w, page_h = page_size
    objects: list[bytes] = []

    def add_obj(payload: bytes) -> int:
        objects.append(payload)
        return len(objects)

    # 1: Catalog
    add_obj(b"<< /Type /Catalog /Pages 2 0 R >>")

    # 2: Pages
    add_obj(b"<< /Type /Pages /Kids [3 0 R] /Count 1 >>")

    # 3: Page (references fonts 4/5 and contents 6)
    add_obj(
        (
            "<< /Type /Page /Parent 2 0 R "
            f"/MediaBox [0 0 {page_w:.0f} {page_h:.0f}] "
            "/Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> "
            "/Contents 6 0 R >>"
        ).encode("ascii")
    )

    # 4: Helvetica-Bold
    add_obj(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>")

    # 5: Helvetica
    add_obj(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>")

    # 6: Contents stream
    stream_dict = f"<< /Length {len(content_stream)} >>\n".encode("ascii")
    stream_obj = stream_dict + b"stream\n" + content_stream + b"\nendstream"
    add_obj(stream_obj)

    # Write file with xref
    out: list[bytes] = []
    out.append(b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n")

    offsets: list[int] = [0] * (len(objects) + 1)
    for idx, payload in enumerate(objects, start=1):
        offsets[idx] = sum(len(part) for part in out)
        out.append(f"{idx} 0 obj\n".encode("ascii"))
        out.append(payload)
        out.append(b"\nendobj\n")

    xref_offset = sum(len(part) for part in out)
    out.append(f"xref\n0 {len(objects) + 1}\n".encode("ascii"))
    out.append(b"0000000000 65535 f \n")
    for idx in range(1, len(objects) + 1):
        out.append(f"{offsets[idx]:010d} 00000 n \n".encode("ascii"))

    out.append(b"trailer\n")
    out.append(
        f"<< /Size {len(objects) + 1} /Root 1 0 R >>\n".encode("ascii")
    )
    out.append(b"startxref\n")
    out.append(f"{xref_offset}\n".encode("ascii"))
    out.append(b"%%EOF\n")

    return b"".join(out)


def main() -> None:
    out_path = Path("output/pdf/desk-yoga-app-summary.pdf")
    layout = OnePageLayout(page_size=LETTER)

    # Paint a white background so PNG renders don't end up with a transparent page.
    page_w, page_h = LETTER
    layout.commands.append(
        f"q 1 1 1 rg 0 0 {page_w:.0f} {page_h:.0f} re f Q"
    )

    layout.title("Desk Yoga - App Summary")

    layout.heading("What it is")
    layout.paragraph(
        "Desk Yoga is a React Native (Expo) app that guides short, desk-friendly yoga sessions "
        "with illustrated poses and timed transitions. Users can start a custom flow or pick a preset; "
        "premium unlocks full access via in-app purchases."
    )

    layout.heading("Who it's for")
    layout.paragraph(
        "People who sit at a desk for long stretches and want quick stretch breaks during the workday "
        "(including discreet sessions during meetings)."
    )

    layout.heading("What it does")
    layout.bullets(
        [
            "Create a session by choosing posture (sitting/standing/any) and duration (1-120 minutes).",
            "Pick curated presets from the home screen; presets route to a paywall when not paid.",
            "Show each pose with an image, name, and step-by-step instructions (supports left/right variants).",
            "Auto-advance poses on a per-pose timer; pause, skip, or go back at any time.",
            "Session settings: time per pose, focus area, camera visibility filter, and transition sound toggle.",
            "In-app purchases: weekly/monthly/yearly/lifetime, restore purchase, and promo code redemption.",
        ],
        max_chars=92,
    )

    layout.heading("How it works (repo-based)")
    layout.bullets(
        [
            "Navigation/UI: Expo Router screens in app/*, styled with NativeWind + Gluestack UI; splash + custom fonts.",
            "Content: static pose catalog in src/data/poses and preset definitions in src/types/presets.",
            "Session engine: src/utils/poseEngine selects the next pose from the catalog using session config "
            "(posture/focus/camera) plus sessionHistory; unpaid users get a curated free-tier sequence.",
            "Timing/animation: usePoseTimer triggers transitions; useSessionDuration ends the session; "
            "Reanimated glow overlay drives the pose swap.",
            "State/services: MMKV (src/utils/storage) persists userName, hasPaid, and sound setting; expo-av plays the chime.",
            "Backend/API: Not found in repo.",
        ],
        max_chars=92,
    )

    layout.heading("How to run (minimal)")
    layout.bullets(
        [
            "npm install",
            "npm run start (Expo dev server)",
            "Run on iOS: npm run ios",
            "Run on Android: npm run android",
        ],
        max_chars=92,
    )

    # Build stream
    content = ("\n".join(layout.commands) + "\n").encode("utf-8")
    pdf_bytes = build_pdf_single_page(content, page_size=LETTER)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_bytes(pdf_bytes)
    print(str(out_path.resolve()))


if __name__ == "__main__":
    main()
