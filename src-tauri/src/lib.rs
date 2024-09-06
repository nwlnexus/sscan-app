// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod db;

#[cfg(desktop)]
mod tray;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_sql::Builder::default().build())
        .setup(|app| {
            let handle = app.handle();
            db::init(handle)?;
            #[cfg(all(desktop))]
            {
                tray::create_tray(handle)?;
            }

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running sscan application");
}
