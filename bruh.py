from amzqr import amzqr

version, level, qr_name = amzqr.run(
    "jack-u",
    version=1,
    level="H",
    picture=None,
    colorized=False,
    contrast=1.0,
    brightness=1.0,
    save_name=None,
    save_dir=__import__("os").getcwd(),
)
