python -m venv venv
activate(){
    . venv/Scripts/activate
    echo "Installing requirements to venv"
    pip install -r requirements.txt
}
activate