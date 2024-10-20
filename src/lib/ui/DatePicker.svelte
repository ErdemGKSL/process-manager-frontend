<script lang="ts">
  import Icon from "@iconify/svelte";
  import { DatePicker } from "bits-ui";
  import { fade } from "svelte/transition";
  import { CalendarDate } from "@internationalized/date";

  export let defaultValue: Date | undefined = undefined;
  export let date = defaultValue && new CalendarDate(defaultValue.getFullYear(), defaultValue.getMonth(), defaultValue.getDate());
</script>

<DatePicker.Root weekdayFormat="short" fixedWeeks={true} bind:value={date}>
  <div class="flex w-full max-w-[232px] flex-col gap-1.5">
    <DatePicker.Input
      let:segments

      class="flex h-input w-full max-w-[232px] select-none items-center rounded-md bg-surface-700 px-2 py-2 text-sm tracking-[0.01em] text-foreground focus-within:shadow-date-field-focus"
    >
      {#each segments as { part, value }}
        <div class="inline-block select-none">
          {#if part === "literal"}
            <DatePicker.Segment {part} class="p-1 text-muted-foreground">
              {value}
            </DatePicker.Segment>
          {:else}
            <DatePicker.Segment
              {part}
              class="rounded-5px px-1 py-1 hover:bg-surface-600 focus:bg-surface-600 focus:text-foreground focus-visible:!ring-0 focus-visible:!ring-offset-0 aria-[valuetext=Empty]:text-muted-foreground"
            >
              {value}
            </DatePicker.Segment>
          {/if}
        </div>
      {/each}
      <DatePicker.Trigger
        class="ml-auto inline-flex size-8 items-center justify-center rounded-[5px] text-foreground/60 transition-all hover:bg-surface-600 active:bg-surface-50"
      >
        <Icon icon="fa6-regular:calendar" width="16" height="16" />
      </DatePicker.Trigger>
    </DatePicker.Input>
    <DatePicker.Content
      sideOffset={6}
      transition={fade}
      transitionConfig={{ duration: 75 }}
      class="z-50"
    >
      <DatePicker.Calendar
        class="rounded-[15px] bg-surface-700 p-[8px] shadow-popover"
        let:months
        let:weekdays
      >
        <DatePicker.Header class="flex items-center justify-between">
          <DatePicker.PrevButton
            class="inline-flex size-10 items-center justify-center rounded-9px bg-surface-700 transition-all hover:bg-surface-600 active:scale-98"
          >
          <Icon icon="line-md:chevron-left" width="24" height="24" />
          </DatePicker.PrevButton>
          <DatePicker.Heading class="text-[15px] font-medium" />
          <DatePicker.NextButton
            class="inline-flex size-10 items-center justify-center rounded-9px bg-surface-700 transition-all hover:bg-surface-600 active:scale-98"
          >
            <Icon icon="line-md:chevron-right" width="24" height="24" />
          </DatePicker.NextButton>
        </DatePicker.Header>
        <div
          class="flex flex-col space-y-4 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0"
        >
          {#each months as month}
            <DatePicker.Grid
              class="w-full select-none space-y-1"
            >
              <DatePicker.GridHead>
                <DatePicker.GridRow class="mb-1 flex w-full justify-between">
                  {#each weekdays as day}
                    <DatePicker.HeadCell
                      class="w-10 rounded-md text-xs !font-normal text-muted-foreground"
                    >
                      <div>{day.slice(0, 2)}</div>
                    </DatePicker.HeadCell>
                  {/each}
                </DatePicker.GridRow>
              </DatePicker.GridHead>
              <DatePicker.GridBody>
                {#each month.weeks as weekDates}
                  <DatePicker.GridRow class="flex w-full">
                    {#each weekDates as date}
                      <DatePicker.Cell
                        {date}
                        class="relative size-10 !p-0 text-center text-sm"
                      >
                        <DatePicker.Day
                          {date}
                          month={month.value}
                          class="group relative inline-flex size-10 items-center justify-center whitespace-nowrap rounded-9px bg-transparent hover:bg-surface-600 p-0 text-sm font-normal text-foreground transition-all data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[outside-month]:pointer-events-none data-[selected]:bg-surface-500 data-[selected]:font-medium data-[disabled]:text-foreground/30 data-[selected]:text-background data-[unavailable]:text-muted-foreground data-[unavailable]:line-through"
                        >
                          <div
                            class="absolute top-[5px] hidden size-1 rounded-full bg-surface-500 hover:bg-surface-600 transition-all group-data-[today]:block group-data-[selected]:bg-surface-700"
                          ></div>
                          {date.day}
                        </DatePicker.Day>
                      </DatePicker.Cell>
                    {/each}
                  </DatePicker.GridRow>
                {/each}
              </DatePicker.GridBody>
            </DatePicker.Grid>
          {/each}
        </div>
      </DatePicker.Calendar>
    </DatePicker.Content>
  </div>
</DatePicker.Root>
