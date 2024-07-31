from config import DevConfig
from main import create_app

if __name__ == "__main__":
    app = create_app(DevConfig)
    app.run(debug=True)  # Enable debug mode for more verbose output
