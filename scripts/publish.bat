SET mypath=%~dp0
pushd %mypath%..
echo "Cleaning js..."
del /s /q js
call tsc
call npm publish
popd