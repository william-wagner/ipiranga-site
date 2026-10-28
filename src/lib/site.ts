import site from '../data/site.json';

export { site };

type Faixa = { abre: string; fecha: string };

export const fmtHora = (h: string) => {
  const [hh, mm] = h.split(':');
  return mm && mm !== '00' ? `${Number(hh)}h${mm}` : `${Number(hh)}h`;
};

const faixa = (f: Faixa) => (f.abre && f.fecha ? `${fmtHora(f.abre)} às ${fmtHora(f.fecha)}` : 'Fechado');

export const horarios = [
  { dias: 'Segunda a sexta', horas: faixa(site.horario.semana) },
  { dias: 'Sábado', horas: faixa(site.horario.sabado) },
  { dias: 'Domingo', horas: faixa(site.horario.domingo) },
];

export const linkWhatsapp = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.mensagemWhatsapp)}`;
export const linkTelefone = `tel:+55${site.telefone.replace(/\D/g, '')}`;
export const enderecoCompleto = `${site.endereco} – ${site.bairro}, ${site.cidade}, ${site.cep}`;
export const linkMapa = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Ipiranga Redutores, ${enderecoCompleto}`)}`;
export const embedMapa = `https://www.google.com/maps?q=${encodeURIComponent(enderecoCompleto)}&output=embed`;
