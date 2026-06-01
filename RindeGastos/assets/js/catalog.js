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

  const impuestos = [
    { id: 1, code: 'IGV', name: 'IGV', pct: 18, type: 'impuesto', country_id: 1, status: true, created_at: '2025-08-12', updated_at: '2026-01-20' },
    { id: 2, code: 'EXO', name: 'Operación exonerada', pct: 0, type: 'impuesto', country_id: 1, status: true, created_at: '2025-08-12', updated_at: '2025-08-12' },
    { id: 3, code: 'RET-3', name: 'Retención 3%', pct: 3, type: 'retencion', country_id: 1, status: true, created_at: '2025-08-20', updated_at: '2025-08-20' },
    { id: 4, code: 'DET-12', name: 'Detracción 12%', pct: 12, type: 'detraccion', country_id: 1, status: true, created_at: '2025-08-20', updated_at: '2025-08-20' },
    { id: 5, code: 'DTO-PP', name: 'Descuento pronto pago', pct: -2, type: 'descuento', country_id: 1, status: true, created_at: '2025-09-01', updated_at: '2025-09-01' },
    { id: 6, code: 'DTO-VOL', name: 'Descuento por volumen', pct: -5, type: 'descuento', country_id: 1, status: true, created_at: '2025-09-01', updated_at: '2025-09-01' },
    { id: 7, code: 'SAL', name: 'Sales Tax', pct: 10, type: 'impuesto', country_id: 2, status: true, created_at: '2025-08-12', updated_at: '2025-08-12' },
    { id: 8, code: 'SAL-NJ', name: 'Sales Tax NJ', pct: 6.6, type: 'impuesto', country_id: 2, status: true, created_at: '2025-08-12', updated_at: '2025-08-12' },
    { id: 9, code: 'USD-DTO-PP', name: 'Descuento pronto pago (USA)', pct: -2, type: 'descuento', country_id: 2, status: true, created_at: '2025-09-15', updated_at: '2025-09-15' },
    { id: 10, code: 'IVA-CL', name: 'IVA Chile', pct: 19, type: 'impuesto', country_id: 3, status: true, created_at: '2025-08-12', updated_at: '2025-08-12' },
    { id: 11, code: 'EXEN-CL', name: 'Operación exenta', pct: 0, type: 'impuesto', country_id: 3, status: true, created_at: '2025-08-12', updated_at: '2025-08-12' },
    { id: 12, code: 'IVA-MX', name: 'IVA México', pct: 16, type: 'impuesto', country_id: 4, status: true, created_at: '2025-09-01', updated_at: '2025-09-01' },
    { id: 13, code: 'IVA-CO', name: 'IVA Colombia', pct: 19, type: 'impuesto', country_id: 5, status: false, created_at: '2025-09-15', updated_at: '2026-03-02' }
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
