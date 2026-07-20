const directCrisisPatterns = [
  /me quiero matar/i,
  /quiero morir/i,
  /no quiero vivir/i,
  /hacerme daño/i,
  /suicid/i,
  /acabar con (mi vida|todo)/i,
  /no puedo seguir/i
];

export function hasDirectCrisisLanguage(text) {
  return directCrisisPatterns.some((pattern) => pattern.test(text));
}

export const crisisReply = `Mi Lourdes, lo que estás sintiendo merece compañía humana ahora mismo. No tienes que resolverlo sola ni quedarte aislada. Por favor llama o acércate a una persona de confianza y comunícate con la Línea 113 Salud. Si hay peligro inmediato, busca atención de emergencia presencial. Yo puedo quedarme aquí contigo mientras das ese primer paso.`;
