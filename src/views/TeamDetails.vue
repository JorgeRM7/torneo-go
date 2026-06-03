<template>
  <section
    v-if="isLoading"
    class="flex flex-col items-center justify-center rounded-2xl bg-white p-20 text-center shadow-lg shadow-orange-900/5 ring-1 ring-orange-100"
  >
    <svg
      class="h-10 w-10 animate-spin text-[#F26A1B]"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    <p class="mt-4 text-base font-black text-slate-900">
      Cargando información del equipo...
    </p>
    <p class="mt-1 text-sm font-semibold text-slate-500">
      Por favor, espera un momento.
    </p>
  </section>

  <section v-else-if="team" class="space-y-6">
    <RouterLink
      to="/teams"
      class="inline-flex h-11 items-center rounded-xl border border-orange-100 bg-white px-4 text-sm font-black text-[#F26A1B] shadow-sm transition hover:bg-orange-50"
    >
      Volver a equipos
    </RouterLink>

    <div
      class="overflow-hidden rounded-2xl bg-white shadow-xl shadow-orange-900/5 ring-1 ring-orange-100"
    >
      <div class="h-3" :style="{ backgroundColor: team.color }"></div>

      <div class="grid gap-6 p-6 lg:grid-cols-[1fr_0.45fr] lg:p-8">
        <div class="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div
            class="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl text-3xl font-black text-white shadow-xl"
            :style="{ backgroundColor: team.color }"
          >
            {{ team.initials }}
          </div>

          <div>
            <div class="flex flex-wrap gap-2">
              <span
                class="rounded-full bg-orange-50 px-3 py-1 text-xs font-black text-[#F26A1B]"
              >
                Grupo {{ team.group }}
              </span>
              <span
                class="rounded-full bg-green-50 px-3 py-1 text-xs font-black text-[#55B532]"
              >
                {{ team.branch }}
              </span>
            </div>

            <h1
              class="mt-4 text-3xl font-black leading-tight text-slate-950 sm:text-4xl"
            >
              {{ team.name }}
            </h1>
          </div>
        </div>

        <div class="rounded-2xl bg-[#FFF4EC] p-5">
          <p class="text-sm font-black uppercase text-slate-400">Plantilla</p>
          <p class="mt-2 text-4xl font-black text-slate-950">
            {{ team.players }}
          </p>
          <p class="mt-1 text-sm font-bold text-slate-500">
            Jugadores registrados
          </p>
        </div>
      </div>
    </div>

    <div class="grid gap-4 md:grid-cols-3">
      <article
        v-for="metric in mainMetrics"
        :key="metric.label"
        class="rounded-2xl bg-white p-5 shadow-lg shadow-orange-900/5 ring-1 ring-orange-100"
      >
        <p class="text-sm font-black uppercase text-slate-400">
          {{ metric.label }}
        </p>
        <p class="mt-2 text-3xl font-black" :class="metric.className">
          {{ metric.value }}
        </p>
        <p class="mt-2 text-sm font-semibold leading-6 text-slate-500">
          {{ metric.description }}
        </p>
      </article>
    </div>

    <div class="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
      <div
        class="rounded-2xl bg-white p-5 shadow-lg shadow-orange-900/5 ring-1 ring-orange-100"
      >
        <h2 class="text-lg font-black text-slate-950">Resultados</h2>
        <dl class="mt-4 space-y-3">
          <div
            v-for="result in resultRows"
            :key="result.label"
            class="flex items-center justify-between rounded-xl bg-[#FFF4EC] px-4 py-3"
          >
            <dt class="text-sm font-bold text-slate-500">{{ result.label }}</dt>
            <dd class="text-lg font-black text-slate-950">
              {{ result.value }}
            </dd>
          </div>
        </dl>
      </div>

      <div
        class="rounded-2xl bg-white p-5 shadow-lg shadow-orange-900/5 ring-1 ring-orange-100"
      >
        <h2 class="text-lg font-black text-slate-950">Goles</h2>
        <div class="mt-4 grid gap-3 sm:grid-cols-3">
          <article
            v-for="goal in goalRows"
            :key="goal.label"
            class="rounded-xl border border-orange-100 bg-[#FFF4EC] p-4"
          >
            <p class="text-sm font-black text-slate-500">{{ goal.label }}</p>
            <p class="mt-2 text-2xl font-black" :class="goal.className">
              {{ goal.value }}
            </p>
          </article>
        </div>
        <div class="mt-5 rounded-xl border border-orange-100 p-4">
          <p class="text-sm font-black text-slate-900">
            Calculo de estadisticas
          </p>
          <p class="mt-2 text-sm font-semibold leading-6 text-slate-500">
            PJ se calcula con ganados + empatados + perdidos. PTS se calcula con
            3 puntos por victoria y 1 por empate. DG se calcula restando goles
            en contra a goles a favor.
          </p>
        </div>
      </div>
    </div>

    <div
      class="rounded-2xl bg-white p-5 shadow-lg shadow-orange-900/5 ring-1 ring-orange-100"
    >
      <div
        class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <h2 class="text-lg font-black text-slate-950">Jugadores</h2>
          <p class="mt-1 text-sm font-semibold text-slate-500">
            Lista generica usada como ejemplo para todos los equipos.
          </p>
        </div>
        <span
          class="rounded-full bg-orange-50 px-3 py-1 text-xs font-black text-[#F26A1B]"
        >
          {{ genericPlayers.length }} registrados
        </span>
      </div>

      <div class="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <article
          v-for="player in genericPlayers"
          :key="player.id"
          class="flex items-center gap-4 rounded-xl border border-orange-100 bg-[#FFF4EC] p-4"
        >
          <div
            class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-lg font-black text-[#F26A1B] shadow-sm"
          >
            <img
              :src="`https://nominas.grupo-ortiz.site/Librerias/img/Fotos/${player.employee_id}.jpg`"
              @error="
                (e) =>
                  (e.target.src = `https://ui-avatars.com/api/?name=${player.number}&background=FFFFFF&color=F26A1B`)
              "
              class="rounded-xl h-full w-full object-cover"
            />
          </div>
          <div>
            <p class="font-black leading-tight text-slate-950">
              {{ player.name }}
            </p>
            <p class="mt-1 text-sm font-bold text-slate-500">
              {{ player.goals }} goles
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>

  <section
    v-else
    class="rounded-2xl border border-dashed border-orange-200 bg-white p-10 text-center"
  >
    <p class="text-lg font-black text-slate-900">Equipo no encontrado</p>
    <p class="mt-2 text-sm font-semibold text-slate-500">
      Revisa la lista de equipos para seleccionar uno disponible.
    </p>
    <RouterLink
      to="/teams"
      class="mt-5 inline-flex h-11 items-center rounded-xl bg-[#F26A1B] px-4 text-sm font-black text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600"
    >
      Ir a equipos
    </RouterLink>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { RouterLink, useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();

const rawTeamData = ref(null);
// Nueva variable para controlar el estado de carga
const isLoading = ref(true);

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

const team = computed(() => {
  if (!rawTeamData.value) return null;

  const t = rawTeamData.value;
  const gf = t.goals_for || 0;
  const ga = t.goals_against || 0;
  const dg = gf - ga;

  return {
    id: t.id,
    name: t.team_name,
    group: t.group_name || "Sin Grupo",
    branch: t.leagues || "General",
    coach: t.coach || "Por asignar",
    color: t.primary_color || "#F26A1B",
    initials: getInitials(t.team_name),
    players: t.players ? t.players.length : 0,
    played: t.played || 0,
    points: t.points || 0,
    won: t.won || 0,
    drawn: t.drawn || 0,
    lost: t.lost || 0,
    goalsFor: gf,
    goalsAgainst: ga,
    goalDifference: dg > 0 ? `+${dg}` : dg,
  };
});

const genericPlayers = computed(() => {
  if (!rawTeamData.value || !rawTeamData.value.players) return [];

  return rawTeamData.value.players.map((player) => ({
    id: player.id,
    number: player.shirt_number ?? "#",
    name: player.full_name,
    goals: player.total_goals || 0,
    employee_id: player.employee_id,
  }));
});

const mainMetrics = computed(() => {
  if (!team.value) return [];
  return [
    {
      label: "PJ",
      value: team.value.played,
      description: "Partidos jugados.",
      className: "text-slate-950",
    },
    {
      label: "PTS",
      value: team.value.points,
      description: "Puntos acumulados.",
      className: "text-[#F26A1B]",
    },
    {
      label: "DG",
      value: team.value.goalDifference,
      description: "Diferencia de goles.",
      className: "text-[#55B532]",
    },
  ];
});

const resultRows = computed(() => {
  if (!team.value) return [];
  return [
    { label: "Ganados", value: team.value.won },
    { label: "Empatados", value: team.value.drawn },
    { label: "Perdidos", value: team.value.lost },
  ];
});

const goalRows = computed(() => {
  if (!team.value) return [];
  return [
    {
      label: "Goles a favor",
      value: team.value.goalsFor,
      className: "text-[#55B532]",
    },
    {
      label: "Goles en contra",
      value: team.value.goalsAgainst,
      className: "text-slate-950",
    },
    {
      label: "Diferencia",
      value: team.value.goalDifference,
      className: "text-[#F26A1B]",
    },
  ];
});

onMounted(async () => {
  try {
    isLoading.value = true; // Nos aseguramos de iniciar la carga
    const teamId = route.params.id;

    const response = await axios.get(
      "https://portal-nominas.grupo-ortiz.site/api/tournament/teams",
    );

    const foundTeam = response.data.find(
      (t) => String(t.id) === String(teamId),
    );

    if (foundTeam) {
      rawTeamData.value = foundTeam;
    }

    console.log(foundTeam);
  } catch (error) {
    console.error("Error al obtener los detalles del equipo:", error);
  } finally {
    isLoading.value = false;
  }
});
</script>
