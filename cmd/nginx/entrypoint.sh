#!/bin/bash
set -eu
# receive env form outside
export PrimaryDomain

envsubst '${PrimaryDomain}' < /proxy.conf.template > /etc/nginx/sites-available/proxy.conf

exec "$@"