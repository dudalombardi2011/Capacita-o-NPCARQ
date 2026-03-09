export interface Trainee {
  nome: string;
  pontos: number;
  imagem: string;
  posicao?: number;
}

/**
 * Interface que representa a estrutura bruta dos dados vindo da API (Google Sheets)
 */
interface RawTrainee {
  name?: string;
  tijolinhos?: string | number;
  imageUrl?: string;
  avatar_url?: string;
}

const API_ENDPOINT = "https://script.google.com/macros/s/AKfycbxhBL-kPzQtfI48iupk2NMrPahV3mSZbduF5qpKn31n-SbeLZScNzJV4YWwzRictUSa/exec";

/**
 * Converte links de compartilhamento do Google Drive em URLs de imagem direta.
 * O endpoint 'thumbnail' é geralmente mais estável para exibição em web.
 */
const convertDriveUrl = (url: string): string => {
  if (!url) return '';

  // Regex aprimorada para capturar IDs do Drive em diversos formatos
  const driveIdRegex = /(?:id=|\/d\/|folders\/|file\/d\/)([a-zA-Z0-9_-]{25,})/;
  const match = url.match(driveIdRegex);

  if (match && match[1]) {
    // Usando o endpoint de thumbnail que é estável
    const driveUrl = `https://drive.google.com/thumbnail?id=${match[1]}&sz=w400`;
    // Passamos pelo nosso proxy para evitar bloqueios de Referer/CORS no iframe
    return `/api/proxy-image?url=${encodeURIComponent(driveUrl)}`;
  }

  return url;
};

export const dataService = {
  async fetchRanking(): Promise<Trainee[]> {
    try {
      const response = await fetch(API_ENDPOINT);
      if (!response.ok) throw new Error('Falha ao carregar dados');
      
      const data = await response.json();
      const rawData = Array.isArray(data) ? data : (data.data || []);

      return rawData
        .map((item: RawTrainee) => ({
          nome: item.name || 'Trainee Anônimo',
          pontos: Number(item.tijolinhos) || 0,
          imagem: convertDriveUrl(item.imageUrl || '')
        }))
        .sort((a: Trainee, b: Trainee) => b.pontos - a.pontos)
        .map((trainee: Trainee, index: number) => ({
          ...trainee,
          posicao: index + 1
        }));
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
};
