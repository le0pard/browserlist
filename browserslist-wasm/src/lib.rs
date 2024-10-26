mod utils;

use browserslist::{Opts, resolve};
use wasm_bindgen::prelude::*;
use serde_wasm_bindgen::from_value;
use wasm_bindgen::JsValue;

#[wasm_bindgen]
pub fn browserslist_wasm(query: String, opts: JsValue) -> Result<JsValue, JsValue> {
    utils::set_panic_hook();

    let opts_resolve: Option<Opts> = from_value(opts).unwrap_or_default();

    serde_wasm_bindgen::to_value(
        &resolve([query], &opts_resolve.unwrap_or_default())
            .map_err(|e| format!("{}", e))?
            .into_iter()
            .map(|d| d.to_string())
            .collect::<Vec<_>>(),
    )
    .map_err(JsValue::from)
}
