const BRAZILIAN_CURRENCY = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0
});

export const formatCurrency = (value) => BRAZILIAN_CURRENCY.format(value);

export const formatDate = (date) => (
  date ? new Date(`${date}T12:00:00`).toLocaleDateString('pt-BR') : '—'
);

export const formatRequiredDate = (date) => (
  new Date(`${date}T12:00:00`).toLocaleDateString('pt-BR')
);

export const filterBySearch = (items, search, getSearchableText) => (
  items.filter((item) => getSearchableText(item)
    .toLocaleLowerCase()
    .includes(search.toLocaleLowerCase()))
);

export const filterByExactValue = (items, selectedValue, allValue, getValue) => (
  selectedValue === allValue ? items : items.filter((item) => getValue(item) === selectedValue)
);

export const sumValuesByStatus = (items, status) => (
  items
    .filter((item) => item.status === status)
    .reduce((sum, item) => sum + item.value, 0)
);

export const getVehicleName = (vehicles, vehicleId, fallback) => {
  const vehicle = vehicles.find((item) => String(item.id) === String(vehicleId));
  return vehicle ? `${vehicle.brand} ${vehicle.name}` : fallback;
};
