<template>
  <div>
    <v-card>
      <v-card-title>
        <span class="headline">{{ bulkTransaction.name }}</span>
        <v-spacer />
        <v-text-field
          append-icon="search"
          label="Search"
          single-line
          hide-details
          v-model="search"
        />
      </v-card-title>
      <v-subheader>
        {{ bulkTransaction.description }}
      </v-subheader>
      <v-data-table
        :headers="headers"
        :items="bulkTransaction.transactions"
        :search="search"
        :rows-per-page-items="rowsPerPageItems"
      >
        <template slot="items" slot-scope="props">
          <td>{{ accountName(props.item.from) }}</td>
          <td>{{ accountName(props.item.to) }}</td>
          <td>{{ props.item.note }}</td>
          <td class="text-xs-right">
            <v-menu
              :min-width="300"
              left
            >
              <span slot="activator" @click="$refs.itemValue.focus()">{{ props.item.value | currency }}</span>
              <v-card>
                <v-card-text>
                  <v-text-field
                    v-model="props.item.value"
                    ref="itemValue"
                  />
                </v-card-text>
              </v-card>
            </v-menu>
          </td>
        </template>
      </v-data-table>
      <v-card-actions>
        <v-btn @click="process" flat>Run</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
  import BackButton from '@/components/BackButton';

  export default {
    components: {
      BackButton,
    },
    data() {
      return {
        headers: [{
          text: 'From',
          value: 'from',
          align: 'left'
        }, {
          text: 'To',
          value: 'to',
          align: 'left'
        }, {
          text: 'Note',
          value: 'note',
          align: 'left'
        }, {
          text: 'Amount',
          value: 'amount',
        }],
        search: '',
        rowsPerPageItems: [10, 20, 50]
      };
    },
    computed: {
      bulkTransaction() {
        return this.$project.bulkTransaction(this.$route.params.bulkTransactionId);
      },
    },
    methods: {
      accountName(accountId) {
        return this.$project.account(accountId).name;
      },
      process() {
        this.$project.addTransactions(this.bulkTransaction.transactions);
      },
    },
  };
</script>

<style lang="scss" scoped>
  header {
    display: flex;
    justify-content: space-between;
  }
</style>