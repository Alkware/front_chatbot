#!/bin/bash
commit_msg="${npm_config_msg:-'Atualizações'}"
git commit -m "$commit_msg"
shift # Isso remove o primeiro argumento ("mensagem de commit") da lista de argumentos
git push origin main

