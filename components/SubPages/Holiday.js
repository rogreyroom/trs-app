// -> click URLOP {__*5*6__}
// * otwiera się okno z formularzem do dodania / edycji urlopu wypoczynkowego
//     (
//       w oknie widoczne są:
//   - formularz z następującymi polami:
//         [
//     - data startu/rozpoczęcia
//     - data końca/zakończenia
//         ]
//   - przycisk Anuluj (czyści formularz i przechodzi do panelu pracownika) __*5*6*1__
//   - przycisk Zapisz (zapisuje dane w bazie, czyści formularz i przechodzi do panelu pracownika) __*5*6*2__
//     )

const HolidayPage = ({ employee }) => {
  return (
    <>
      <h1>Holiday sub page</h1>
      <p>Employee: { employee }</p>
    </>
  )
}

export default HolidayPage