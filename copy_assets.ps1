$brain = "C:\Users\Mr_LapTop\.gemini\antigravity\brain\d1ab2c70-616a-4dcc-b2f3-7eafba221a42"
$dest = "D:\product\traditionalshoes\public\images"

$mapping = @{
    "hero_khussa_royal" = "$dest\hero\hero_khussa_royal.jpg"
    "khussa_olive_embroidered" = "$dest\khussa\khussa_olive_embroidered.jpg"
    "khussa_golden_bridal" = "$dest\khussa\khussa_golden_bridal.jpg"
    "khussa_cream_gold" = "$dest\khussa\khussa_cream_gold.jpg"
    "khussa_forest_green" = "$dest\khussa\khussa_forest_green.jpg"
    "khussa_copper_brown" = "$dest\khussa\khussa_copper_brown.jpg"
    "khussa_custom_bridal" = "$dest\khussa\khussa_custom_bridal.jpg"
    "khussa_mens_traditional" = "$dest\khussa\khussa_mens_traditional.jpg"
    "khussa_exclusive_wedding" = "$dest\khussa\khussa_exclusive_wedding.jpg"
    "shabri_classic_leather" = "$dest\shabri\shabri_classic_leather.jpg"
    "shabri_olive_stitched" = "$dest\shabri\shabri_olive_stitched.jpg"
    "shabri_copper_tan" = "$dest\shabri\shabri_copper_tan.jpg"
    "saraiki_double_sole_tan" = "$dest\saraiki\saraiki_double_sole_tan.jpg"
    "saraiki_heritage_multani" = "$dest\saraiki\saraiki_heritage_multani.jpg"
    "saraiki_forest_traditional" = "$dest\saraiki\saraiki_forest_traditional.jpg"
    "bridal_baraat_crimson_gold" = "$dest\bridal\bridal_baraat_crimson_gold.jpg"
    "bridal_walima_pearl" = "$dest\bridal\bridal_walima_pearl.jpg"
    "mehndi_festive_dabka" = "$dest\mehndi\mehndi_festive_dabka.jpg"
    "bridal_royal_emerald" = "$dest\bridal\bridal_royal_emerald.jpg"
    "shawl_olive_zardozi" = "$dest\shawls\shawl_olive_zardozi.jpg"
    "shawl_forest_velvet" = "$dest\shawls\shawl_forest_velvet.jpg"
    "shawl_cornsilk_pashmina" = "$dest\shawls\shawl_cornsilk_pashmina.jpg"
    "shawl_embroidery_detail" = "$dest\shawls\shawl_embroidery_detail.jpg"
    "craft_embroidery_artisan" = "$dest\craftsmanship\craft_embroidery_artisan.jpg"
    "craft_leather_artisan" = "$dest\craftsmanship\craft_leather_artisan.jpg"
    "studio_materials_swatches" = "$dest\studio\studio_materials_swatches.jpg"
}

Get-ChildItem -Path $brain -Filter "*.jpg" | ForEach-Object {
    $file = $_
    foreach ($key in $mapping.Keys) {
        if ($file.Name.StartsWith($key)) {
            $target = $mapping[$key]
            $parent = Split-Path $target
            if (-not (Test-Path $parent)) { New-Item -ItemType Directory -Path $parent -Force | Out-Null }
            Copy-Item $file.FullName $target -Force
            Write-Host "Copied $($file.Name) -> $target"
        }
    }
}
