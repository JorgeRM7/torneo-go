<template>
  <section>
    <div class="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="text-xs font-bold uppercase tracking-widest text-[#F26A1B]">
          Torneo GO
        </p>

        <h1 class="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
          Próximos partidos
        </h1>

        <p class="mt-1 text-sm text-slate-600">
          Encuentros programados del torneo.
        </p>
      </div>

      <span class="w-fit rounded-full bg-[#F26A1B]/10 px-4 py-2 text-sm font-black text-[#F26A1B]">
        {{ filteredMatches.length }} encuentros
      </span>
    </div>

    <!-- Tabs -->
    <div class="mb-5 -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <div class="flex w-max min-w-full gap-2 rounded-2xl bg-white p-2 shadow-sm ring-1 ring-orange-100 sm:min-w-0">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          type="button"
          class="shrink-0 rounded-xl px-3 py-2 text-xs font-black transition sm:px-4 sm:text-sm"
          :class="activeTab === tab.value
            ? 'bg-[#F26A1B] text-white shadow-md shadow-orange-500/20'
            : 'text-slate-500 hover:bg-orange-50 hover:text-[#F26A1B]'"
          @click="activeTab = tab.value"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- Loading -->
    <div
      v-if="loading"
      class="rounded-2xl border border-orange-100 bg-white p-6 text-center shadow-sm"
    >
      <p class="font-black text-slate-800">
        Cargando partidos...
      </p>
    </div>

    <!-- Error -->
    <div
      v-else-if="error"
      class="rounded-2xl border border-red-100 bg-red-50 p-6 text-center shadow-sm"
    >
      <p class="font-black text-red-600">
        {{ error }}
      </p>

      <button
        type="button"
        class="mt-4 rounded-xl bg-[#F26A1B] px-4 py-2 text-sm font-black text-white transition hover:bg-orange-600"
        @click="getMatches"
      >
        Reintentar
      </button>
    </div>

    <!-- Cards -->
    <div v-else class="grid gap-4 xl:grid-cols-2">
      <article
        v-for="match in filteredMatches"
        :key="match.id"
        class="rounded-2xl border border-orange-100 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg sm:p-4"
      >
      {{  match}}
        <div class="mb-3 flex items-start justify-between gap-3">
          <div class="min-w-0">
            <p class="text-[11px] font-black uppercase tracking-widest text-[#F26A1B] sm:text-xs">
              {{ match.title }}
            </p>

            <p class="truncate text-xs font-semibold text-slate-500 sm:text-sm">
              {{ match.category }}
            </p>
          </div>

          <span
            class="shrink-0 rounded-full px-2.5 py-1 text-[10px] font-black sm:px-3 sm:text-xs"
            :class="match.status === 'Descanso'
              ? 'bg-orange-100 text-[#F26A1B]'
              : match.status === 'Finalizado'
                ? 'bg-slate-100 text-slate-600'
                : 'bg-[#55B532]/10 text-[#55B532]'"
          >
            {{ match.status }}
          </span>
        </div>

        <!-- Mobile layout -->
        <div class="space-y-3 sm:hidden">
          <div class="flex items-center gap-3 rounded-xl bg-orange-50/70 p-3">
            <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-sm font-black text-[#F26A1B]">
              {{ match.homeInitials }}
            </div>

            <div class="min-w-0">
              <p class="truncate text-sm font-black text-slate-900">
                {{ match.homeTeam }}
              </p>
              <p class="text-xs font-semibold text-slate-400">
                {{ match.isRest ? 'Equipo' : 'Local' }}
              </p>
            </div>
          </div>

          <div class="mx-auto w-fit rounded-xl bg-slate-100 px-5 py-2 text-center">
            <p class="text-[10px] font-black uppercase tracking-widest text-slate-400">
              {{ match.isRest ? 'Descanso' : 'VS' }}
            </p>

            <p class="text-lg font-black text-slate-900">
              {{ match.homeScore }} - {{ match.awayScore }}
            </p>
          </div>

          <div class="flex items-center gap-3 rounded-xl bg-green-50/70 p-3">
            <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-sm font-black text-[#55B532]">
              {{ match.awayInitials }}
            </div>

            <div class="min-w-0">
              <p class="truncate text-sm font-black text-slate-900">
                {{ match.awayTeam }}
              </p>
              <p class="text-xs font-semibold text-slate-400">
                {{ match.isRest ? 'Sin rival' : 'Visitante' }}
              </p>
            </div>
          </div>
        </div>

        <!-- Tablet/Desktop layout -->
        <div class="hidden grid-cols-[1fr_auto_1fr] items-center gap-3 sm:grid">
          <div class="flex items-center gap-3">
            <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-50 text-sm font-black text-[#F26A1B]">
              {{ match.homeInitials }}
            </div>

            <div class="min-w-0">
              <p class="truncate text-sm font-black text-slate-900">
                {{ match.homeTeam }}
              </p>
              <p class="text-xs font-semibold text-slate-400">
                {{ match.isRest ? 'Equipo' : 'Local' }}
              </p>
            </div>
          </div>

          <div class="rounded-xl bg-slate-100 px-3 py-2 text-center">
            <p class="text-[10px] font-black uppercase tracking-widest text-slate-400">
              {{ match.isRest ? 'Descanso' : 'VS' }}
            </p>

            <p class="text-base font-black text-slate-900">
              {{ match.homeScore }} - {{ match.awayScore }}
            </p>
          </div>

          <div class="flex items-center justify-end gap-3 text-right">
            <div class="min-w-0">
              <p class="truncate text-sm font-black text-slate-900">
                {{ match.awayTeam }}
              </p>
              <p class="text-xs font-semibold text-slate-400">
                {{ match.isRest ? 'Sin rival' : 'Visitante' }}
              </p>
            </div>

            <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-50 text-sm font-black text-[#55B532]">
              {{ match.awayInitials }}
            </div>
          </div>
        </div>

        <div class="mt-4 grid gap-2 rounded-xl bg-[#FFF4EC] p-3 sm:grid-cols-3">
          <div class="flex items-center gap-2">
            <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white">
              📅
            </span>

            <div>
              <p class="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Fecha
              </p>
              <p class="text-xs font-black text-slate-800">
                {{ match.date }}
              </p>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white">
              ⏰
            </span>

            <div>
              <p class="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Hora
              </p>
              <p class="text-xs font-black text-slate-800">
                {{ match.time }}
              </p>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white">
              📍
            </span>

            <div class="min-w-0">
              <p class="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Ubicación
              </p>
              <p class="truncate text-xs font-black text-slate-800">
                {{ match.location }}
              </p>
            </div>
          </div>
        </div>
      </article>
    </div>

    <!-- Empty -->
    <div
      v-if="!loading && !error && filteredMatches.length === 0"
      class="mt-6 rounded-2xl border border-orange-100 bg-white p-6 text-center shadow-sm"
    >
      <p class="font-black text-slate-800">
        No hay encuentros registrados en esta categoría.
      </p>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import axios from 'axios'

const activeTab = ref('female')
const matches = ref([])
const loading = ref(false)
const error = ref(null)

const tabs = [
  {
    label: 'Femenil',
    value: 'female',
  },
  {
    label: 'Varonil Grupo A',
    value: 'male_a',
  },
  {
    label: 'Varonil Grupo B',
    value: 'male_b',
  },
]

const getInitials = (name) => {
  if (!name) return '--'

  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase()
}

const formatDate = (date) => {
  if (!date) return 'Sin fecha'

  return new Date(date).toLocaleDateString('es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

const formatTime = (date) => {
  if (!date) return 'Sin hora'

  return `${new Date(date).toLocaleTimeString('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })} hrs`
}

const getLeague = (match) => {
  return (
    match.local_team?.leagues ||
    match.visiting_team?.leagues ||
    ''
  ).toUpperCase()
}

const getGroupName = (match) => {
  return (
    match.local_team?.group_name ||
    match.visiting_team?.group_name ||
    match.group_name ||
    ''
  ).toUpperCase()
}

const getGroup = (match) => {
  const league = getLeague(match)
  const groupName = getGroupName(match)

  if (league === 'FEMENIL') {
    return 'female'
  }

  if (league === 'VARONIL' && groupName === 'A') {
    return 'male_a'
  }

  if (league === 'VARONIL' && groupName === 'B') {
    return 'male_b'
  }

  return 'male_a'
}

const normalizeStatus = (status) => {
  const value = String(status || 'pendiente').toLowerCase()

  const statuses = {
    pendiente: 'Programado',
    programado: 'Programado',
    finalizado: 'Finalizado',
    descanso: 'Descanso',
  }

  return statuses[value] || status
}

const normalizeMatches = (data) => {
  return data.map((match) => {
    const isRest = match.status === 'descanso' || !match.visiting_team

    const restTeamName =
      match.rest_team?.team_name ||
      match.local_team?.team_name ||
      'Equipo en descanso'

    const localTeamName = isRest
      ? restTeamName
      : match.local_team?.team_name || 'Equipo local'

    const awayTeamName = isRest
      ? 'DESCANSA'
      : match.visiting_team?.team_name || 'Equipo visitante'

    const league = getLeague(match)
    const groupName = getGroupName(match)

    return {
      id: match.id,
      group: getGroup(match),
      title: `Jornada ${match.match_day}`,
      category: isRest
        ? 'Descanso'
        : `${league || 'Torneo'}${groupName ? ` Grupo ${groupName}` : ''}`,
      status: normalizeStatus(match.status),
      isRest,
      homeTeam: localTeamName,
      awayTeam: awayTeamName,
      homeInitials: getInitials(localTeamName),
      awayInitials: isRest ? '--' : getInitials(awayTeamName),
      homeScore: isRest ? '-' : match.local_goals ?? 0,
      awayScore: isRest ? '-' : match.away_goals ?? 0,
      date: formatDate(match.match_date),
      time: formatTime(match.match_date),
      location: match.soccer_field || 'Sin ubicación',
    }
  })
}

const getMatches = async () => {
  loading.value = true
  error.value = null

  try {
    const response = await axios.get(
      'https://portal-nominas.grupo-ortiz.site/api/tournament/matches'
    )

    matches.value = normalizeMatches(response.data)
  } catch (err) {
    console.error(err)
    error.value = 'No se pudieron cargar los partidos'
  } finally {
    loading.value = false
  }
}

const filteredMatches = computed(() => {
  return matches.value.filter((match) => match.group === activeTab.value)
})

onMounted(() => {
  getMatches()
})
</script>