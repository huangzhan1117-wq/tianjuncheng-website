from pathlib import Path

from PIL import Image, ImageEnhance


ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path(r"C:\Users\huangzhan1117\Desktop\47434e40-cd93-4be6-868a-e26fc1781671.png")
ASSETS = ROOT / "assets"


def save_crop(image, name, box, *, contrast=1, sharpness=1):
    crop = image.crop(box)
    if contrast != 1:
        crop = ImageEnhance.Contrast(crop).enhance(contrast)
    if sharpness != 1:
        crop = ImageEnhance.Sharpness(crop).enhance(sharpness)
    crop.save(ASSETS / name, optimize=True)


def main():
    ASSETS.mkdir(exist_ok=True)
    image = Image.open(SOURCE).convert("RGB")

    save_crop(image, "hero-machine.png", (565, 50, 1195, 455), contrast=1.04, sharpness=1.02)
    save_crop(image, "service-map.png", (535, 755, 1145, 1018), contrast=1.02, sharpness=1.04)
    save_crop(image, "project-site.png", (454, 1087, 560, 1199), contrast=1.02, sharpness=1.08)
    save_crop(image, "prototype-preview.png", (0, 0, 1195, 1316))

    positions = [58, 211, 365, 493, 627, 765, 904, 1032]
    names = [
        "equip-20t.png",
        "equip-25t.png",
        "equip-50t.png",
        "equip-70t.png",
        "equip-aerial.png",
        "equip-excavator.png",
        "equip-truck-crane.png",
        "equip-flatbed.png",
    ]
    for name, x in zip(names, positions):
        save_crop(image, name, (x, 560, min(x + 118, image.width), 662), sharpness=1.08)

    print("created 12 assets")


if __name__ == "__main__":
    main()
