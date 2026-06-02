<template>
  <section class="space-y-8">
    <div
      class="overflow-hidden rounded-2xl bg-white shadow-xl shadow-orange-900/5 ring-1 ring-orange-100"
    >
      <div class="grid gap-0 lg:grid-cols-[1.4fr_0.6fr]">
        <div class="p-6 sm:p-8 lg:p-10">
          <div
            class="inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-xs font-black uppercase tracking-wide text-[#F26A1B]"
          >
            Torneo GO
          </div>

          <div class="mt-5 max-w-3xl">
            <h1
              class="text-3xl font-black leading-tight text-slate-950 sm:text-4xl"
            >
              Equipos del torneo
            </h1>
            <p class="mt-3 text-base font-medium leading-7 text-slate-600">
              Consulta los equipos registrados, su grupo, entrenador y
              rendimiento actual dentro del torneo de futbol.
            </p>
          </div>

          <div class="mt-8 grid gap-3 sm:grid-cols-3">
            <article
              v-for="stat in stats"
              :key="stat.label"
              class="rounded-xl border border-orange-100 bg-[#FFF4EC] p-4"
            >
              <p class="text-2xl font-black text-slate-950">{{ stat.value }}</p>
              <p class="mt-1 text-sm font-bold text-slate-500">
                {{ stat.label }}
              </p>
            </article>
          </div>
        </div>
      </div>
    </div>

    <div
      class="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-lg shadow-orange-900/5 ring-1 ring-orange-100 lg:flex-row lg:items-center lg:justify-between"
    >
      <label class="relative flex-1">
        <span class="sr-only">Buscar equipo</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
          />
        </svg>
        <input
          v-model="search"
          type="search"
          placeholder="Buscar por equipo o filtra por grupo"
          class="h-12 w-full rounded-xl border border-orange-100 bg-[#FFF4EC] pl-11 pr-4 text-sm font-semibold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#F26A1B] focus:bg-white focus:ring-4 focus:ring-orange-100"
        />
      </label>

      <div class="flex flex-wrap gap-2">
        <button
          v-for="group in groups"
          :key="group"
          type="button"
          class="h-11 rounded-xl px-4 text-sm font-black transition"
          :class="
            selectedGroup === group
              ? 'bg-[#F26A1B] text-white shadow-lg shadow-orange-500/20'
              : 'border border-orange-100 bg-orange-50 text-slate-600 hover:border-[#F26A1B] hover:text-[#F26A1B]'
          "
          @click="selectedGroup = group"
        >
          {{ group === "Todos" ? "Todos" : "Grupo " + group }}
        </button>
      </div>
    </div>

    <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      <article
        v-for="team in filteredTeams"
        :key="team.id"
        class="group overflow-hidden rounded-2xl bg-white shadow-lg shadow-orange-900/5 ring-1 ring-orange-100 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-900/10"
      >
        <div class="h-2" :style="{ backgroundColor: team.color }"></div>

        <div class="p-5">
          <div class="flex items-start justify-between gap-4">
            <div class="flex items-center gap-4">
              <div
                class="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-xl font-black text-white shadow-lg"
                :style="{ backgroundColor: team.color }"
              >
                {{ team.initials }}
              </div>

              <div>
                <h2 class="text-lg font-black leading-tight text-slate-950">
                  {{ team.name }}
                </h2>
                <p class="mt-1 text-sm font-bold text-slate-500">
                  Grupo {{ team.group }}
                </p>
              </div>
            </div>

            <span
              class="rounded-full bg-green-50 px-3 py-1 text-xs font-black text-[#55B532]"
            >
              {{ team.branch }}
            </span>
          </div>

          <dl class="mt-6 grid grid-cols-3 gap-3">
            <div class="rounded-xl bg-[#FFF4EC] p-3 text-center">
              <dt class="text-xs font-black uppercase text-slate-400">PJ</dt>
              <dd class="mt-1 text-lg font-black text-slate-950">
                {{ team.played }}
              </dd>
            </div>
            <div class="rounded-xl bg-[#FFF4EC] p-3 text-center">
              <dt class="text-xs font-black uppercase text-slate-400">PTS</dt>
              <dd class="mt-1 text-lg font-black text-[#F26A1B]">
                {{ team.points }}
              </dd>
            </div>
            <div class="rounded-xl bg-[#FFF4EC] p-3 text-center">
              <dt class="text-xs font-black uppercase text-slate-400">DG</dt>
              <dd class="mt-1 text-lg font-black text-[#55B532]">
                {{ team.goalDifference }}
              </dd>
            </div>
          </dl>

          <div class="mt-5 space-y-3 border-t border-orange-100 pt-5">
            <div class="flex items-center justify-between gap-3 text-sm">
              <span class="font-bold text-slate-500">Jugadores</span>
              <span class="font-black text-slate-800">{{ team.players }}</span>
            </div>

            <RouterLink
              :to="{ name: 'DetalleEquipo', params: { id: team.id } }"
              class="mt-4 inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#F26A1B] px-4 text-sm font-black text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600"
            >
              Ver detalles
            </RouterLink>
          </div>
        </div>
      </article>
    </div>

    <div
      class="rounded-2xl bg-white p-5 shadow-lg shadow-orange-900/5 ring-1 ring-orange-100"
    >
      <h2 class="text-lg font-black text-slate-950">
        Como se leen las estadisticas
      </h2>

      <div class="mt-4 grid gap-3 md:grid-cols-3">
        <article
          v-for="item in statGuide"
          :key="item.code"
          class="rounded-xl border border-orange-100 bg-[#FFF4EC] p-4"
        >
          <p class="text-sm font-black text-[#F26A1B]">{{ item.code }}</p>
          <p class="mt-1 font-black text-slate-900">{{ item.name }}</p>
          <p class="mt-2 text-sm font-semibold leading-6 text-slate-500">
            {{ item.description }}
          </p>
        </article>
      </div>
    </div>

    <div
      v-if="filteredTeams.length === 0"
      class="rounded-2xl border border-dashed border-orange-200 bg-white p-10 text-center"
    >
      <p class="text-lg font-black text-slate-900">No se encontraron equipos</p>
      <p class="mt-2 text-sm font-semibold text-slate-500">
        Intenta cambiar el grupo o la busqueda.
      </p>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import axios from "axios";

// Guía estática que se queda en el componente
const statGuide = ref([
  {
    code: "PJ",
    name: "Partidos Jugados",
    description: "Total de partidos que el equipo ha disputado en el torneo.",
  },
  {
    code: "PTS",
    name: "Puntos",
    description: "Puntos acumulados (3 por victoria, 1 por empate).",
  },
  {
    code: "DG",
    name: "Diferencia de Goles",
    description: "Goles a favor menos goles en contra.",
  },
]);

// Estado principal para los equipos de la API
const teams = ref([]);
const search = ref("");
const selectedGroup = ref("Todos");

// Helper para obtener las iniciales del equipo (ej: "SIN PENDIENTES FC" -> "SP")
const getInitials = (name) => {
  if (!name) return "FC";
  return name
    .split(" ")
    .filter((word) => word.toLowerCase() !== "fc")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

// Mapeamos los datos crudos de la API al formato que usa tu HTML <template>
const teamsWithStats = computed(() => {
  return teams.value.map((team) => {
    // Calculamos diferencia de goles con lo que viene en la API
    const dg = (team.goals_for || 0) - (team.goals_against || 0);

    return {
      id: team.id,
      name: team.team_name,
      group: team.group_name || "Sin Grupo",
      branch: team.leagues || "General",
      played: team.played || 0, // Si tu API no lo da, por defecto 0
      points: team.points || 0, // Si tu API no lo da, por defecto 0
      goalDifference: dg > 0 ? `+${dg}` : dg, // Formato visual (+3 o -2)
      players: team.players ? team.players.length : 0,
      initials: getInitials(team.team_name),
      // Usamos el color primario de la API o uno naranja por defecto si viene null
      color: team.primary_color || "#F26A1B",
      // Guardamos entrenadores o datos extra si los ocupas para buscar
      coach: team.coach || "",
    };
  });
});

// Grupos dinámicos basados en la respuesta de la API
const groups = computed(() => {
  const extractedGroups = teams.value
    .map((team) => team.group_name)
    .filter(Boolean);
  return ["Todos", ...new Set(extractedGroups.sort())];
});

// Estadísticas globales del panel superior
const stats = computed(() => [
  {
    label: "Equipos registrados",
    value: teams.value.length,
  },
  {
    label: "Jugadores",
    value: teams.value.reduce(
      (total, team) => total + (team.players ? team.players.length : 0),
      0,
    ),
  },
  {
    label: "Grupos",
    value: groups.value.length - 1,
  },
]);

// Filtro por buscador y por grupo seleccionado
const filteredTeams = computed(() => {
  const query = search.value.trim().toLowerCase();

  return teamsWithStats.value.filter((team) => {
    const matchesGroup =
      selectedGroup.value === "Todos" || team.group === selectedGroup.value;

    // Buscamos coincidencia en nombre, liga/rama o entrenador
    const matchesSearch = [team.name, team.coach, team.branch].some((value) =>
      String(value).toLowerCase().includes(query),
    );

    return matchesGroup && matchesSearch;
  });
});

// Llamada a la API al montar el componente
onMounted(async () => {
  try {
    const response = await axios.get(
      "https://portal-nominas.grupo-ortiz.site/api/tournament/teams",
    );
    // Asignamos la respuesta directamente a nuestra referencia reactiva
    teams.value = response.data;
  } catch (error) {
    console.error("Error al traer los equipos de la API:", error);
  }
});
</script>
