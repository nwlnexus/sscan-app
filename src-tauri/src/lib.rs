// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use tauri_plugin_sql::{Migration, MigrationKind};

#[cfg(desktop)]
mod tray;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let migrations: Vec<Migration> = vec![Migration {
        version: 1,
        description: "create_intial_tables",
        sql: "CREATE TABLE records (id INTEGER PRIMARY KEY);",
        kind: MigrationKind::Up,
    }];

    tauri::Builder::default()
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:sscan.sqlite", migrations)
                .build(),
        )
        .setup(|app| {
            let handle = app.handle();
            #[cfg(all(desktop))]
            {
                tray::create_tray(handle)?;
            }

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running sscan application");
}
