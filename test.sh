#!/bin/bash

yarn jest:test &

# Start the server in the background
yarn dev &

# Get the process ID (PID) of the server
SERVER_PID=$!

# Run Cypress tests
yarn cypress:test

# Stop the server after tests
kill $SERVER_PID
