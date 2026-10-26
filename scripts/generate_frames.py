import os
import math
import io
import urllib.request
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance
import numpy as np

OUTPUT_SOFA_DIR = os.path.join("public", "sequences", "sofa")
OUTPUT_TRANSFORM_DIR = os.path.join("public", "sequences", "transform")
WIDTH = 1280
HEIGHT = 720

os.makedirs(OUTPUT_SOFA_DIR, exist_ok=True)
os.makedirs(OUTPUT_TRANSFORM_DIR, exist_ok=True)

HEADERS = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

def fetch_image(url, fallback_color=(240, 237, 230)):
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=10) as response:
            data = response.read()
            img = Image.open(io.BytesIO(data)).convert("RGB")
            return img.resize((WIDTH, HEIGHT), Image.Resampling.LANCZOS)
    except Exception as e:
        print(f"Fallback for {url}: {e}")
        # Create an architectural gradient fallback
        img = Image.new("RGB", (WIDTH, HEIGHT), fallback_color)
        draw = ImageDraw.Draw(img)
        for y in range(HEIGHT):
            ratio = y / HEIGHT
            c = (
                int(fallback_color[0] * (1 - ratio * 0.15)),
                int(fallback_color[1] * (1 - ratio * 0.15)),
                int(fallback_color[2] * (1 - ratio * 0.15)),
            )
            draw.line([(0, y), (WIDTH, y)], fill=c)
        return img

print("Fetching base assets for photorealistic sequence...")
# 1. Wide luxury living room with sofa
img_room = fetch_image("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80", (235, 230, 222))
# 2. Studio centered Belmo Solace sofa
img_studio_front = fetch_image("https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1400&q=80", (246, 243, 237))
# 3. Studio 3/4 angle
img_studio_angle = fetch_image("https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1400&q=80", (240, 235, 228))
# 4. Craftsmanship / leather & walnut detail
img_craft_profile = fetch_image("https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1400&q=80", (230, 224, 215))
# 5. Macro bouclé weave & hand-stitching
img_macro_stitch = fetch_image("https://images.unsplash.com/photo-1584589167171-541ce45f1eea?auto=format&fit=crop&w=1400&q=80", (248, 245, 240))

TOTAL_SOFA_FRAMES = 140

print(f"Generating {TOTAL_SOFA_FRAMES} frames for Continuous Scroll Sequence...")

for i in range(1, TOTAL_SOFA_FRAMES + 1):
    progress = (i - 1) / (TOTAL_SOFA_FRAMES - 1) # 0.0 to 1.0

    if progress < 0.20:
        # Phase 1: 0.0 -> 0.20: Room view, slow cinematic approach
        p = progress / 0.20
        # Zoom from 1.0 to 1.30
        zoom = 1.0 + p * 0.30
        crop_w = int(WIDTH / zoom)
        crop_h = int(HEIGHT / zoom)
        cx = int(WIDTH * 0.50)
        cy = int(HEIGHT * (0.50 + p * 0.08))
        left = max(0, cx - crop_w // 2)
        top = max(0, cy - crop_h // 2)
        frame = img_room.crop((left, top, left + crop_w, top + crop_h)).resize((WIDTH, HEIGHT), Image.Resampling.BILINEAR)

    elif progress < 0.40:
        # Phase 2: 0.20 -> 0.40: Deep glide into sofa, background starts fading into clean studio
        p = (progress - 0.20) / 0.20
        zoom_room = 1.30 + p * 0.45
        crop_w = int(WIDTH / zoom_room)
        crop_h = int(HEIGHT / zoom_room)
        cx = int(WIDTH * 0.50)
        cy = int(HEIGHT * 0.58)
        left = max(0, cx - crop_w // 2)
        top = max(0, cy - crop_h // 2)
        room_frame = img_room.crop((left, top, left + crop_w, top + crop_h)).resize((WIDTH, HEIGHT), Image.Resampling.BILINEAR)
        # Soften room background
        if p > 0.3:
            room_frame = room_frame.filter(ImageFilter.GaussianBlur(radius=int((p - 0.3) * 6)))

        # Studio front blend in
        zoom_studio = 0.9 + p * 0.15
        cw_s = int(WIDTH / zoom_studio)
        ch_s = int(HEIGHT / zoom_studio)
        left_s = max(0, (WIDTH - cw_s) // 2)
        top_s = max(0, (HEIGHT - ch_s) // 2)
        studio_crop = img_studio_front.crop((left_s, top_s, left_s + cw_s, top_s + ch_s)).resize((WIDTH, HEIGHT), Image.Resampling.BILINEAR)

        blend_alpha = p ** 1.3
        frame = Image.blend(room_frame, studio_crop, blend_alpha)

    elif progress < 0.65:
        # Phase 3: 0.40 -> 0.65: Studio rotation & architectural profile
        p = (progress - 0.40) / 0.25
        if p < 0.5:
            # Front to 3/4 angle
            sub_p = p / 0.5
            frame = Image.blend(img_studio_front, img_studio_angle, sub_p)
        else:
            # 3/4 angle to profile craft
            sub_p = (p - 0.5) / 0.5
            frame = Image.blend(img_studio_angle, img_craft_profile, sub_p)

    elif progress < 0.85:
        # Phase 4: 0.65 -> 0.85: Deep macro zoom into upholstery, stitching, and tactile texture
        p = (progress - 0.65) / 0.20
        # Blend from craft profile into macro stitch
        stitch_blend = min(1.0, p * 1.5)
        base_texture = Image.blend(img_craft_profile, img_macro_stitch, stitch_blend)
        
        # Macro zoom in and slow pan across stitching
        macro_zoom = 1.0 + p * 0.60
        crop_w = int(WIDTH / macro_zoom)
        crop_h = int(HEIGHT / macro_zoom)
        cx = int(WIDTH * (0.45 + p * 0.12))
        cy = int(HEIGHT * (0.50 + p * 0.05))
        left = max(0, cx - crop_w // 2)
        top = max(0, cy - crop_h // 2)
        frame = base_texture.crop((left, top, left + crop_w, top + crop_h)).resize((WIDTH, HEIGHT), Image.Resampling.BILINEAR)

    else:
        # Phase 5: 0.85 -> 1.0: Pull back revealing complete sofa and transitioning smoothly
        p = (progress - 0.85) / 0.15
        pull_zoom = 1.60 - p * 0.60
        crop_w = int(WIDTH / pull_zoom)
        crop_h = int(HEIGHT / pull_zoom)
        left = max(0, (WIDTH - crop_w) // 2)
        top = max(0, (HEIGHT - crop_h) // 2)
        macro_pull = img_macro_stitch.crop((left, top, left + crop_w, top + crop_h)).resize((WIDTH, HEIGHT), Image.Resampling.BILINEAR)
        frame = Image.blend(macro_pull, img_studio_front, p ** 1.2)

    # Add a subtle luxury studio lighting grading (warm tones & slight vignette)
    filename = f"frame_{i:03d}.webp"
    filepath = os.path.join(OUTPUT_SOFA_DIR, filename)
    frame.save(filepath, "WEBP", quality=82, method=4)

print("Sofa sequence completed successfully!")

# Now generate Transform Sequence (Section 07: Transform Your Space)
print("Generating Transform Sequence (Empty Room -> Furnished Luxury Sanctuary)...")
img_empty = fetch_image("https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80", (230, 226, 218))
img_furnished = fetch_image("https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=80", (242, 238, 230))

TOTAL_TRANSFORM_FRAMES = 50
for j in range(1, TOTAL_TRANSFORM_FRAMES + 1):
    p = (j - 1) / (TOTAL_TRANSFORM_FRAMES - 1)
    
    # Smooth step transition curve
    smooth_p = 3 * p**2 - 2 * p**3
    
    # Subtle camera dolly
    zoom = 1.0 + p * 0.08
    crop_w = int(WIDTH / zoom)
    crop_h = int(HEIGHT / zoom)
    left = (WIDTH - crop_w) // 2
    top = (HEIGHT - crop_h) // 2
    
    emp_cropped = img_empty.crop((left, top, left + crop_w, top + crop_h)).resize((WIDTH, HEIGHT), Image.Resampling.BILINEAR)
    fur_cropped = img_furnished.crop((left, top, left + crop_w, top + crop_h)).resize((WIDTH, HEIGHT), Image.Resampling.BILINEAR)
    
    t_frame = Image.blend(emp_cropped, fur_cropped, smooth_p)
    
    t_filename = f"frame_{j:03d}.webp"
    t_filepath = os.path.join(OUTPUT_TRANSFORM_DIR, t_filename)
    t_frame.save(t_filepath, "WEBP", quality=82, method=4)

print("All animation frame sequences generated in WebP format!")
