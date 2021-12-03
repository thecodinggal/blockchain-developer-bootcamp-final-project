# Contract Security Measures

## SWC-103 : Floating Pragma
Contract is deployed with a limited compiler version (version 0.8.0 - 0.9.0) and versions have been tested

## SWC-104 : Unchecked Call Return Value
The message call is checked to stop if there is an exception using the require()

## SWC-134 : Message Call with hardcoded gas amount
There is no fixed gas amount and the call.value(...)("") is called correctly

## Modifiers used only for validation
Modifiers are only used for validation (require statements)

