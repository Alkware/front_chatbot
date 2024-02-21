#!/bin/bash
commit_msg="${npm_config_msg:-'Atualizações'}"
git commit -m "$commit_msg"
