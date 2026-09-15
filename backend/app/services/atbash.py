EN_LOW = "abcdefghijklmnopqrstuvwxyz"
EN_UP = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
HEBREW = "אבגדהוזחטיכךלמםנןסעפףצץקרשת"


def atbash(text: str) -> str | None:
    result = ""

    for char in text:
        if char in EN_LOW:
            result += get_atbash(EN_LOW, char)
        elif char in EN_UP:
            result += get_atbash(EN_UP, char)
        else:
            result += get_atbash(HEBREW, char)

    return result      
        
def get_atbash(charcters: str, char: str):
    find_index = charcters.index(char)
    return charcters[-find_index-1]

