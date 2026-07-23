from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

OUT_DIR = Path(r"C:\Users\steve\OneDrive\Documents\Pawly App\img\logoset")
NAMES = [
    "Pawly_AppIcon_Pri",
    "Pawly_AppIcon_Sec",
    "Pawly_Wordmark_Pri",
    "Pawly_Wordmark_Simple",
    "Pawly_Logo_Pri",
    "Pawly_Logo_Stacked",
]
DARK = (9, 31, 54, 255)
LINEN = (250, 249, 246, 255)


def composite_on(image, background):
    base = Image.new("RGBA", image.size, background)
    return Image.alpha_composite(base, image)


font = ImageFont.load_default()
cell_w, cell_h = 520, 260
sheet = Image.new("RGBA", (cell_w * 2, cell_h * len(NAMES) + 160), (255, 255, 255, 255))
draw = ImageDraw.Draw(sheet)
draw.text((16, 10), "Pawly export validation: dark blue and Linen White backgrounds", fill=(0, 0, 0, 255), font=font)
draw.text((16, 32), "Draft vector cleanup for approval before final visual changes", fill=(0, 0, 0, 255), font=font)

for col, bg, label in [(0, DARK, "Dark blue"), (1, LINEN, "Linen White")]:
    x = col * cell_w
    draw.rectangle([x, 60, x + cell_w - 1, cell_h * len(NAMES) + 59], fill=bg)
    text_color = (255, 255, 255, 255) if bg == DARK else (0, 0, 0, 255)
    draw.text((x + 12, 68), label, fill=text_color, font=font)

for row, name in enumerate(NAMES):
    src = Image.open(OUT_DIR / f"{name}.png").convert("RGBA")
    src.thumbnail((cell_w - 80, cell_h - 70), Image.Resampling.LANCZOS)
    for col, bg in [(0, DARK), (1, LINEN)]:
        x = col * cell_w + (cell_w - src.width) // 2
        y = 60 + row * cell_h + (cell_h - src.height) // 2 + 16
        sheet.paste(composite_on(src, bg), (x, y))
        text_color = (255, 255, 255, 255) if bg == DARK else (0, 0, 0, 255)
        draw.text((col * cell_w + 12, 60 + row * cell_h + 92), name, fill=text_color, font=font)

small = Image.new("RGBA", (520, 120), DARK)
small_draw = ImageDraw.Draw(small)
small_draw.text((12, 8), "App icon 64px and 32px on dark blue", fill=(255, 255, 255, 255), font=font)
for i, name in enumerate(["Pawly_AppIcon_Pri", "Pawly_AppIcon_Sec"]):
    src = Image.open(OUT_DIR / f"{name}.png").convert("RGBA")
    for j, size in enumerate([64, 32]):
        icon = src.resize((size, size), Image.Resampling.LANCZOS)
        x = 20 + i * 250 + j * 90
        y = 38
        small.paste(composite_on(icon, DARK), (x, y))
        small_draw.text((x, y + size + 4), f"{name.rsplit('_', 1)[-1]} {size}px", fill=(255, 255, 255, 255), font=font)

sheet.alpha_composite(small, (0, cell_h * len(NAMES) + 70))
out = OUT_DIR / "Pawly_validation_preview.png"
sheet.convert("RGB").save(out, quality=95)
print(out)
