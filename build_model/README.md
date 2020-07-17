### labelIMG

mkdir ~/github

sudo apt-get install -y pyqt4-dev-tools

pip install lxml

cd ~/github

git clone https://github.com/tzutalin/labelImg

cd ~/github/labelImg

make qt5py3

cd ~/github/labelImg

./labelImg.py

----------------------------------------

## install protobuf3 on ubuntu
# Make sure you grab the latest version
curl -OL https://github.com/google/protobuf/releases/download/v3.2.0/protoc-3.2.0-linux-x86_64.zip

# Unzip
unzip protoc-3.2.0-linux-x86_64.zip -d protoc3

# Move protoc to /usr/local/bin/
sudo mv protoc3/bin/* /usr/local/bin/

# Move protoc3/include to /usr/local/include/
sudo mv protoc3/include/* /usr/local/include/

# Optional: change owner
sudo chwon [user] /usr/local/bin/protoc

sudo chwon -R [user] /usr/local/include/google

-----------------------------------------------------------
# install dependency
pip install tensorflow==1.15.0

pip install tf_slim

pip install --no-deps tensorflowjs==1.4.0

pip install tensorflow_hub

sudo apt install build-essential

pip install pycocotools


