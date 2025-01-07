package main
import (
	"fmt"
	"os"
	"encoding/json"
)
type zadanie struct {
	ID		 int
	Nazwa	 string
	Wykonane bool
}

var zadania []zadanie
var lista_id = []int{0}
var zad zadanie
func DodajZadanie(Nazwa string) {
	for _, v := range lista_id {
		if v+1 != zad.ID {
			zad.ID = v+1
			lista_id = append(lista_id, zad.ID)
		}
	}
	zad.Nazwa = Nazwa
	zad.Wykonane = false
	zadania = append(zadania, zad)
}
func Wyswietl() {
	for i:=0; i < len(zadania) ; i++{
		if zadania[i].Wykonane == true {
			fmt.Print(zadania[i].ID," ☑ ",zadania[i].Nazwa,"\n")
		} else {
			fmt.Print(zadania[i].ID," ☐ ",zadania[i].Nazwa,"\n")
		}
	}
}
func oznacz(ID int) {
	zadania[ID-1].Wykonane = true
}
func UsunZadanie(IDdoUsun int) {
	IDdoUsun--
	zadania = append(zadania[:IDdoUsun], zadania[IDdoUsun+1:]...)
	lista_id = append(lista_id[:IDdoUsun], lista_id[IDdoUsun+1:]...)
}
func odczytPlik(sciezka string) {
	plik, err := os.ReadFile(sciezka)
	if err != nil {
		fmt.Print("Kod Błędu: ",err)
	}
	var dane []zadanie
	err = json.Unmarshal(plik, &dane)
	if err != nil {
		fmt.Print("Kod Błędu: ",err)
	}
	*&zadania = dane
	*&lista_id = make([]int, len(dane))
	lista_id = append(lista_id, 0)
	for i,z := range dane {
		(*&lista_id)[i] = z.ID
	}
}
func zapisPlik(nazwapliku string) {
	zapis, err := json.Marshal(zadania)
	if err != nil {
		fmt.Print("Kod Błędu: ",err)
	}
	err = os.WriteFile(nazwapliku,zapis,0644)
	if err != nil {
		fmt.Print("Kod Błędu: ",err)
	}
	fmt.Print("Zadania zapisane do pliku")
}
func main() {
	var opcja int
	var UtworzID string
	var UsunID int
	var WykonajID int
	var Sciezka string
	var nazwa string
	for {
		fmt.Print("-----------------------------\n")
		fmt.Print("Wybierz opcję\n1.Wyświetl zadania.\n2.Dodaj zadanie.\n3.Usuń zadanie.\n4.Oznacz jako wykonane.\n5.Wczytaj Zadania z Pliku.\n6.Zapisz zadania do Pliku\n7.Opuść program\nNapisz numer opcji:  ")
		fmt.Scan(&opcja)
		switch opcja {
		case 1:
			fmt.Print("-----------------------------\n")
			if len(zadania) == 0{
				fmt.Print("Lista zadań jest pusta, dodaj zadania.\n")
			}else{
				Wyswietl()
			}
		case 2:
			fmt.Print("-----------------------------\n")
			fmt.Print("Podaj nazwę zadania: ")
			fmt.Scan(&UtworzID)
			if UtworzID == ""{
				fmt.Print("Nazwa nie może być pusta.")
			}else{
				DodajZadanie(UtworzID)
			}
		case 3:
			fmt.Print("-----------------------------\n")
			fmt.Print("Napisz numer zadania które chcesz usunąć: ")
			fmt.Scan(&UsunID)
			if len(zadania) == 0{
				fmt.Print("Lista zadań jest pusta, dodaj zadania.\n")
			}else{
				UsunZadanie(UsunID)
			}
		case 4:
			fmt.Print("-----------------------------\n")
			fmt.Print("Napisz numer zadania które wykonałeś: ")
			fmt.Scan(&WykonajID)
			if len(zadania) == 0{
				fmt.Print("Lista zadań jest pusta, dodaj zadania.\n")
			}else{
				oznacz(WykonajID)
			}
		case 5:
			fmt.Print("-----------------------------\n")
			fmt.Print("Podaj ścieżke do pliku: ")
			fmt.Scan(&Sciezka)
			odczytPlik(Sciezka)
		case 6:
			fmt.Print("-----------------------------\n")
			fmt.Print("Podaj nazwę pliku: ")
			fmt.Scan(&nazwa)
			zapisPlik(nazwa)
		case 7:
			os.Exit(0)
		default:
			fmt.Print("-----------------------------\n")
			fmt.Print("Taka opcja nie istnieje\n")
		}
	}
}