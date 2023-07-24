for file in (find public/assets/tea-log -name tea.jpg)
    set outfile (echo $file | sed 's/\.jpg/\.gif/')
    convert $file -resize 128x128 -dither FloydSteinberg -colors 8 -bordercolor indigo -border 2 $outfile
end
