import os
import sys

def is_digit(element):
    try:
        element = int(element)
        return True
    except ValueError:
        return False

def is_operator(element):
    if element in ["+", "-", "*", "/"]:
        return True
    else:
        return False

class FormulaSyntaxError:
    def __init__(self):
        pass

formula = "100 2 3 + 4 5 + x -"
formula = "1 2 + 3 + "
stack = []

for element in formula.split(" "):
    print(stack)
    if is_digit(element):
        stack.append(int(element))
    elif is_operator(element):
        second_digit = stack.pop()
        first_digit = stack.pop()
        if element == "+":
            stack.append(first_digit + second_digit)
        elif element == "-":
            stack.append(first_digit - second_digit)
        elif element == "*":
            stack.append(first_digit * second_digit)
        elif element == "/":
            stack.append(first_digit / second_digit)
        else:
            print("debug") # 処理がここにこない
            #raise FormulaSyntaxError("something wrong in your formula")
    else:
        pass


print(stack[0])
