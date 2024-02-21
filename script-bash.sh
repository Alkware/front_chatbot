#!/bin/bash
commit_msg="$1"
git commit -m "$commit_msg"
shift # Isso remove o primeiro argumento ("mensagem de commit") da lista de argumentos
git push origin main

