components {
  id: "cleat"
  component: "/main/pipe/cleat.script"
}
embedded_components {
  id: "sprite"
  type: "sprite"
  data: "default_animation: \"cleat_red\"\n"
  "material: \"/builtins/materials/sprite.material\"\n"
  "size {\n"
  "  x: 90.0\n"
  "  y: 90.0\n"
  "}\n"
  "size_mode: SIZE_MODE_MANUAL\n"
  "textures {\n"
  "  sampler: \"texture_sampler\"\n"
  "  texture: \"/resources/cleat.atlas\"\n"
  "}\n"
  ""
  position {
    z: 0.8
  }
  scale {
    z: 0.8
  }
}
