use std::fs;
use std::path::Path;
use tauri::Runtime;

pub fn init<R: Runtime>(app: &tauri::AppHandle<R>) -> tauri::Result<()> {
    if !db_file_exists(app) {
        create_db_file(app);
    }

    Ok(())
}

fn create_db_file<R: Runtime>(app: &tauri::AppHandle<R>) {
    let db_path = get_db_path(app);
    let db_dir = Path::new(&db_path).parent().unwrap();

    // If the parent directory does not exist, create it.
    if !db_dir.exists() {
        fs::create_dir_all(db_dir).unwrap();
    }

    // Create the database file.
    fs::File::create(db_path).unwrap();
}

// Check whether the database file exists.
fn db_file_exists<R: Runtime>(app: &tauri::AppHandle<R>) -> bool {
    let db_path = get_db_path(app);
    Path::new(&db_path).exists()
}

// Get the path where the database file should be located.
fn get_db_path<R: Runtime>(app: &tauri::AppHandle<R>) -> String {
    let home_dir = dirs::home_dir().unwrap();
    home_dir.to_str().unwrap().to_string()
        + "/.config/"
        + &*app.package_info().name.to_string()
        + "/database.sqlite"
}
