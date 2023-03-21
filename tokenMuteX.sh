#!/bin/bash

TOKEN="NzhkODQxNGNkYjdjODVjN2Q3NjliNWJkNjI0OWZjYzNlYmI5YmI2ZmE5M2VhMjAw"

xh "https://$(echo $TOKEN | base64 -d):@packagecloud.io/api/v1/distributions"
