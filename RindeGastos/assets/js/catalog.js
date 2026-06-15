/*
 * Catálogo compartido de Países, Monedas, Impuestos y mapeo a Políticas.
 * Lo consumen las pantallas de Administrador (Países, Monedas, Impuestos, Políticas)
 * y las pantallas del Rendidor para crear gastos (impuestos derivados del país de la política).
 */

window.RD_CATALOG = (function () {
  const paises = [
    { id: 1, code: 'PE', iso3: 'PER', name: 'Perú', phone: '+51', flag: '🇵🇪', status: true, created_by: 'María Rojas', created_at: '2025-08-12', updated_by: 'María Rojas', updated_at: '2026-01-20' },
    { id: 2, code: 'US', iso3: 'USA', name: 'Estados Unidos', phone: '+1', flag: '🇺🇸', status: true, created_by: 'María Rojas', created_at: '2025-08-12', updated_by: 'Pedro Morales', updated_at: '2026-02-04' },
    { id: 3, code: 'CL', iso3: 'CHL', name: 'Chile', phone: '+56', flag: '🇨🇱', status: true, created_by: 'María Rojas', created_at: '2025-08-12', updated_by: 'María Rojas', updated_at: '2025-12-10' },
    { id: 4, code: 'MX', iso3: 'MEX', name: 'México', phone: '+52', flag: '🇲🇽', status: true, created_by: 'María Rojas', created_at: '2025-09-01', updated_by: 'María Rojas', updated_at: '2025-09-01' },
    { id: 5, code: 'CO', iso3: 'COL', name: 'Colombia', phone: '+57', flag: '🇨🇴', status: false, created_by: 'María Rojas', created_at: '2025-09-15', updated_by: 'Carlos Mendoza', updated_at: '2026-03-02' }
  ];

  const monedas = [
    { id: 1, code: 'PEN', name: 'Sol Peruano', symbol: 'S/', country_id: 1, decimals: 2, status: true, is_default: true, exchange_rate: 1, created_at: '2025-08-12', updated_at: '2026-01-20' },
    { id: 2, code: 'USD', name: 'Dólar Estadounidense', symbol: 'US$', country_id: 2, decimals: 2, status: true, is_default: true, exchange_rate: 3.75, created_at: '2025-08-12', updated_at: '2026-01-20' },
    { id: 3, code: 'CLP', name: 'Peso Chileno', symbol: 'CLP$', country_id: 3, decimals: 0, status: true, is_default: true, exchange_rate: 0.0040, created_at: '2025-08-12', updated_at: '2025-12-10' },
    { id: 4, code: 'MXN', name: 'Peso Mexicano', symbol: 'MX$', country_id: 4, decimals: 2, status: true, is_default: true, exchange_rate: 0.22, created_at: '2025-09-01', updated_at: '2025-09-01' },
    { id: 5, code: 'COP', name: 'Peso Colombiano', symbol: 'COP$', country_id: 5, decimals: 0, status: false, is_default: true, exchange_rate: 0.00095, created_at: '2025-09-15', updated_at: '2026-03-02' },
    { id: 6, code: 'USD-PE', name: 'Dólar (operaciones Perú)', symbol: 'US$', country_id: 1, decimals: 2, status: true, is_default: false, exchange_rate: 3.75, created_at: '2025-10-01', updated_at: '2026-02-15' }
  ];

  // Esquema alineado a la migración `taxes`:
  //   id, country_id (FK), name (120), code (60 nullable), percentage (5,2),
  //   status (bool), timestamps + soft deletes.
  const impuestos = [
    { id: 1, country_id: 1, name: 'IGV', code: 'IGV', percentage: 18.00, status: true, created_at: '2025-08-12', updated_at: '2026-01-20' },
    { id: 2, country_id: 1, name: 'Operación exonerada', code: 'EXO', percentage: 0.00, status: true, created_at: '2025-08-12', updated_at: '2025-08-12' },
    { id: 3, country_id: 1, name: 'Retención 3%', code: 'RET-3', percentage: 3.00, status: true, created_at: '2025-08-20', updated_at: '2025-08-20' },
    { id: 4, country_id: 1, name: 'Detracción 12%', code: 'DET-12', percentage: 12.00, status: true, created_at: '2025-08-20', updated_at: '2025-08-20' },
    { id: 5, country_id: 2, name: 'Sales Tax', code: 'SAL', percentage: 10.00, status: true, created_at: '2025-08-12', updated_at: '2025-08-12' },
    { id: 6, country_id: 2, name: 'Sales Tax NJ', code: 'SAL-NJ', percentage: 6.60, status: true, created_at: '2025-08-12', updated_at: '2025-08-12' },
    { id: 7, country_id: 3, name: 'IVA Chile', code: 'IVA-CL', percentage: 19.00, status: true, created_at: '2025-08-12', updated_at: '2025-08-12' },
    { id: 8, country_id: 3, name: 'Operación exenta', code: 'EXEN-CL', percentage: 0.00, status: true, created_at: '2025-08-12', updated_at: '2025-08-12' },
    { id: 9, country_id: 4, name: 'IVA México', code: 'IVA-MX', percentage: 16.00, status: true, created_at: '2025-09-01', updated_at: '2025-09-01' },
    { id: 10, country_id: 5, name: 'IVA Colombia', code: 'IVA-CO', percentage: 19.00, status: false, created_at: '2025-09-15', updated_at: '2026-03-02' }
  ];

  // Mapeo políticas → país (paralelo a la lista de politicas-listar.html).
  // Permite a las pantallas de Gastos resolver impuestos por país de la política.
  const politicasCountry = {
    'POL-001': { country_id: 1, currency_id: 1 },
    'POL-002': { country_id: 1, currency_id: 1 },
    'POL-003': { country_id: 2, currency_id: 2 },
    'POL-004': { country_id: 1, currency_id: 1 },
    'POL-005': { country_id: 1, currency_id: 1 },
    'POL-006': { country_id: 3, currency_id: 3 },
    'POL-007': { country_id: 1, currency_id: 1 },
    'POL-008': { country_id: 2, currency_id: 2 }
  };

  function getCountry(id) { return paises.find((p) => p.id === id) || null; }
  function getCurrency(id) { return monedas.find((m) => m.id === id) || null; }
  function getTax(id) { return impuestos.find((t) => t.id === id) || null; }
  function countriesActive() { return paises.filter((p) => p.status); }
  function currenciesByCountry(countryId) { return monedas.filter((m) => m.country_id === countryId); }
  function taxesByCountry(countryId) { return impuestos.filter((t) => t.country_id === countryId); }
  function policyCountry(code) { return politicasCountry[code] || null; }

  function symbolForCurrencyCode(code) {
    const m = monedas.find((x) => x.code === code);
    return m ? m.symbol : code;
  }

  return {
    paises, monedas, impuestos, politicasCountry,
    getCountry, getCurrency, getTax,
    countriesActive, currenciesByCountry, taxesByCountry,
    policyCountry, symbolForCurrencyCode
  };
})();
