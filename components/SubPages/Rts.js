// -> click RCP {__*5*5__}
//       * otwiera się okno z formularzem do dodania / edycji rejestracji czasu pracy
//           (
//             w oknie widoczne są:
//         - formularz z następującymi polami:
//               [
//           - data rejestracji czasu pracy
//           - ilość godzin
//           - ilość godzin nadliczbowych
//           - ilość godzin weekendowych
//           - dodatkowy formularz z oceną pracownika zawierający następujące pola:
//                 [
//             - SP
//             - MP
//             - LP
//             - EW
//             - przyznany przez kierownika procent premii
//                 ]
//             - przycisk dodaj (dodaje dane do tymczasowej tablicy w pamięci) __*5*5*1__
//               ]
//         - przycisk Anuluj (czyści formularz i przechodzi do panelu pracownika) __*5*5*2__
//         - przycisk Zapisz (zapisuje dane w bazie, czyści formularz i przechodzi do panelu pracownika) __*5*5*3__
//           )

const RtsPage = ({ employee }) => {
  return (
    <>
      <h1>RTS sub page</h1>
      <p>Employee: { employee }</p>
    </>
  )
}

export default RtsPage