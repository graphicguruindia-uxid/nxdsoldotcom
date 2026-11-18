# Generate favicon variants and navbar logo using PowerShell with System.Drawing
using namespace System.Drawing
using namespace System.Drawing.Drawing2D
using namespace System.IO

$src = 'images/NXDSOL_fav.ico.png'
$dst16 = 'images/favicon-16.png'
$dst32 = 'images/favicon-32.png'
$dst180 = 'images/apple-touch-icon.png'
$dstLogo = 'images/logo-navbar.png'

if ([File]::Exists($src)) {
    # 16x16 favicon
    $img = [Image]::FromFile($src)
    $bmp = New-Object Bitmap($img, 16, 16)
    $bmp.Save($dst16, [ImageFormat]::Png)
    $bmp.Dispose(); $img.Dispose()

    # 32x32 favicon
    $img = [Image]::FromFile($src)
    $bmp = New-Object Bitmap($img, 32, 32)
    $bmp.Save($dst32, [ImageFormat]::Png)
    $bmp.Dispose(); $img.Dispose()

    # 180x180 apple-touch-icon
    $img = [Image]::FromFile($src)
    $bmp = New-Object Bitmap($img, 180, 180)
    $bmp.Save($dst180, [ImageFormat]::Png)
    $bmp.Dispose(); $img.Dispose()

    Write-Host "Favicon variants created: 16x16, 32x32, 180x180"

    # Logo from the full logo source, resized to 128 wide
    $logoSrc = 'images/NXDSOL_logo.png'
    if ([File]::Exists($logoSrc)) {
        $img = [Image]::FromFile($logoSrc)
        $scale = [float]128 / $img.Width
        $newH = [int]($img.Height * $scale)
        $bmp = New-Object Bitmap($img, 128, $newH)
        $bmp.Save($dstLogo, [ImageFormat]::Png)
        $bmp.Dispose(); $img.Dispose()
        $sz = (Get-Item $dstLogo).Length
        Write-Host "logo-navbar.png created: $([math]::Round($sz/1024,1)) KB (128 x $newH)"
    }
} else {
    Write-Host "Source image not found at $src"
}