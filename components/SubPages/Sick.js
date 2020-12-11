// -> click CHOROBOWE {__*5*8__}
//       * otwiera się okno z formularzem do dodania / edycji chorobowego
//           (
//             w oknie widoczne są:
//         - formularz z następującymi polami:
//               [
//           - data startu/rozpoczęcia
//           - data końca/zakończenia
//               ]
//         - przycisk Anuluj (czyści formularz i przechodzi do panelu pracownika) __*5*8*1__
//         - przycisk Zapisz (zapisuje dane w bazie, czyści formularz i przechodzi do panelu pracownika) __*5*8*2__
//           )

const SickPage = ({ employee }) => {
  return (
    <>
      <h1>Sick sub page</h1>
      <p>Employee: { employee }</p>
    </>
  )
}

export default SickPage