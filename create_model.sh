#!/bin/bash
# Bash script to create a model using ollama
#add 5 seconds sleep to wait for the model to be created
nohup ollama serve &
ollama create Lexi-Llama-3-8B-Uncensored_Q8_0.gguf -f hackyeah2024/RAG-System/models/Lexi-Llama-3-8B-Uncensored_Q8_0
