import React, { useState } from "react";

const INITIAL_LIST = [
  { name: "Domates", value: 55.0 },
  { name: "Marul", value: 25.5 },
  { name: "Ekmek", value: 10.99 },
];

//cozum
// onncelikle ana iskeleti olusturalim return altinda  1 string icin  <input> 1 de number icin <input>
// 1 adet <button>
//  son olarak liste icin <ul> <li> <span> <buton> yapisi.
// tum bunlari ayri <div> ler de tutalim
// iskelet tamam simdi fonksiyonlari dusunelim
// string input icin  : useState hook kullanalim const [itemName, setItemName] = useState("");
//  const handleNameChange = (e) => { setItemName(e.target.value);}; fonksiyonu ilede girilen degeri setItemName set edelim
//// number input icin : const [itemValue, setItemValue] = useState("")
// bu inputa  sadece number girmesini istedigimiz icin fonksiyonu tanimlarken bu kosula dikkat edelim :const handleValueChange = (e) => {const value = e.target.value.replace(/[^0-9.]/g, '');setItemValue(value);};
// inputlar tamam simdi butonu tanimlayalim
// buton icin onclick fonksiyonnunu tanimlayalim const addItemToList = () => {}
// addItemToList fonksiyonu her iki input alani dolu oldugunda calisacak if (itemName && itemValue > 0)
// inputlar girildi kosul saglandi . listede tutabilmekk icin newItem diye bir degisken tanimlayallim ve name: itemName, value: parseFloat(itemValue) degerlerini tutalim
// ve bu yeni item i listeye ekleyelim setList([...list, newItem])
// eklem isleminden sonra inputlari bosaltmak icin setItemName(""); setItemValue(""); yapmayi unutmayalim.
// buton  da tamam geldik listeye . aslinda addItemToList fonksiyonu icin biraz listeden bahsetmistik
// liste icin once  const [list, setList] = useState(INITIAL_LIST); //listenin tutulacagi state
// <li> elemanları, öğenin adını ve fiyatını içeren bir <span> elemanı ve kaldırma butonunu içerir. 
// <span> elemanı  {item.name} ile  listenin her öğesi için öğe adını içerir
// <span> elemanı {item.value.toFixed(2)} öğenin fiyatını, yuvarlanmış ve iki ondalık basamağa sahip bir metin olarak içerir.
//<li>  <button onClick={() => removeItemFromList(item.id)} ile listedeki itemleri kaldirma butonu yaplim.
// const removeItemFromList = (index) => { ... } olusturalim
//kaldirma islemi sirasinda mevcut listeyi değiştirmemek icin const newList = [...list]; ile mevcut listeyi yeni bir degikene atayalim
// simdi yeni listeden oge kalldirmak icin newList.splice(index, 1); index konumundaki bir öğe kaldırılır. İkinci parametre olan 1, kaldırılacak öğe sayısını belirtir.
//setList(newList); yapisi ile de durum guncellenir.
//  son olarrak  her öğe için bir <li> elemanı oluşturmak icin list dizisi üzerinde map fonksiyonu kullalim {list.map((item) => (
// css icin yaptigim calismalar ilgili yerlerde acikklanmistir.

// Bileşen oluşturalim
const ItemValueList = () => {
  const [list, setList] = useState(INITIAL_LIST); //listenin tutulacagi state
  const [itemName, setItemName] = useState(""); // string input icin
  const [itemValue, setItemValue] = useState(""); // number input icin

  // Listeye yeni bir öğe eklemek için fonksiyon
  const addItemToList = () => {
    if (itemName && itemValue > 0) {
      const newItem = {
        id: list.length > 0 ? list[list.length - 1].id + 1 : 1, // Yeni id değerini dinamik olarak atayalım
        name: itemName,
        value: parseFloat(itemValue),
      };
      setList([...list, newItem]);
      setItemName("");
      setItemValue("");
    }
  };
  
  // Listeden bir öğeyi kaldırmak için fonksiyon
  const removeItemFromList = (index) => {
    const newList = [...list];
    newList.splice(index, 1);
    setList(newList);
  };

  // Öğe adı input alanındaki değişiklikleri takip eden fonksiyon
  const handleNameChange = (e) => {
    setItemName(e.target.value);
  };

  // Fiyat input alanındaki değişiklikleri takip eden fonksiyon
  const handleValueChange = (e) => {
    // Sadece sayılar ve '.' karakterine izin verilir
    const value = e.target.value.replace(/[^0-9.]/g, "");
    setItemValue(value);
  };

  const totalCost = list.reduce((acc, item) => acc + item.value, 0).toFixed(2); // Listenin toplam maliyetini hesapla ve iki ondalık basamağa yuvarla
//reduce fonksiyonu, bir dizi üzerinde bir döngü yaparak dizinin elemanlarını bir araya getirmek veya dönüştürmek için kullanılı

  // JSX ile bileşenin görünümü oluşturulur
  return (
    <div className="flex justify-center items-center h-screen">
      {" "}
      {/* Ekranın ortasında hizalanmış bir container */}
      <div className="bg-gray-100 p-8 rounded shadow-lg w-96">
      <h1 className="text-3xl mb-4 text-center font-semibold text-gray-800">PAZAR HESABI</h1> {/* Başlık için özel stil */}
    
        {" "}
        {/* Gri arka plan, padding, yuvarlatılmış kenarlar ve gölge */}
        <div className="mb-4">
          {" "}
          {/* Boşluk */}
          <input
            type="text"
            placeholder="Öğe Adı"
            value={itemName}
            onChange={handleNameChange}
            className="border border-gray-300 p-2 rounded w-full" // Çerçeve, padding, yuvarlatılmış kenarlar ve genişlik
          />
        </div>
        <div className="mb-4">
          {" "}
          {/* Boşluk */}
          <input
            type="number"
            placeholder="Fiyat"
            min="0"
            step="0.01"
            value={itemValue}
            onChange={handleValueChange}
            className="border border-gray-300 p-2 rounded w-full" // Çerçeve, padding, yuvarlatılmış kenarlar ve genişlik
          />
        </div>
        <div className="mb-4">
          {" "}
          {/* Boşluk */}
          <button
            onClick={addItemToList}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {" "}
            {/* Mavi arka plan, beyaz metin, padding ve yuvarlatılmış kenarlar */}
            Gönder
          </button>
        </div>
        <div>
          <ul>
            {/* list dizisi üzerinde map fonksiyonu kullanılarak her öğe için bir <li> elemanı oluşturulur */}
            {list.map((item,index) => (
              <li
              key={item.id}
                className="flex justify-between items-center mb-2"
              >
                {" "}
                {/* Flex düzeni, boşluk, sağa ve sola hizalama */}
                <span>
                  {item.name} - ${item.value.toFixed(2)}
                </span>{" "}
                {/* Öğe adı ve fiyat */}
                <button
                  onClick={() => removeItemFromList(index)}
                  className="text-red-500"
                >
                  {" "}
                  {/* Kırmızı metin */}X {/* Kaldırma butonu */}
                </button>
              </li>
            ))}
          </ul>
          <div className="text-right mt-4">
            <strong>Toplam Maliyet:</strong> ${totalCost}
          </div>
        </div>
      </div>
    </div>
  );
};

// Ana uygulama bileşeni
function App() {
  return <ItemValueList />;
}

export default App;
