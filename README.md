# turtle

deploy your own tiny image model for production in a flash

## backend

activate backend:
```
uvicorn backend:app --reload --host 0.0.0.0 --port 8000
```

## frontend

setup
```
cd frontend
npm i
```

activate frontend:
```
npm run dev
```

*you should go through the model training process (see pixel below) for obtaining the generator_model.safetensors as backend model in order to activating your backend otherwise it doesn't work (can't make it without a model file)

---

## model training: pixel

git clone the pixel repo:
```
git clone https://github.com/mochiyaki/pixel
```

get inside the cloned folder:
```
cd pixel
```

start training with the sample dataset (in ./data/):
```
python trainer.py
```

training epoch (currently 50)

![screenshot](https://raw.githubusercontent.com/mochiyaki/pixel/master/graph.png)
