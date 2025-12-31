#!/bin/bash

# Get the PID of the currently FOCUSED window
PID=$(xdotool getwindowfocus getwindowpid 2>/dev/null)

if [ -z "$PID" ]; then
    if command -v notify-send >/dev/null; then
        notify-send -u critical "Force Kill" "Could not detect window PID.\n(Focus the window first)"
    fi
    exit 1
fi

NAME=$(ps -p $PID -o comm=)

if command -v notify-send >/dev/null; then
    notify-send -u normal "Force Kill" "Terminating $NAME ($PID) and all child processes..."
fi

# Kill the process group (covers most child services)
PGID=$(ps -o pgid= -p $PID | grep -o '[0-9]*')
if [ -n "$PGID" ]; then
    kill -9 -$PGID 2>/dev/null
fi

# Fallback: Kill the specific PID if group kill failed
kill -9 $PID 2>/dev/null
