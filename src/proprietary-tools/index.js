import { registerBlockType } from "@wordpress/blocks";
import SimpleParallax from "simple-parallax-js";
import edit from "./edit";
import save from "./save";
import metadata from "./block.json";

// Make SimpleParallax available globally for view.js
window.SimpleParallax = SimpleParallax;

registerBlockType(metadata.name, {
  ...metadata,
  edit,
  save,
});
