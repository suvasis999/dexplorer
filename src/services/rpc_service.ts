export default class RPCService {
    rpc_url: string = 'http://rpc.drala.io:8545';

    async adminNodeInfo() {
        const body = { "jsonrpc": "2.0", "method": "admin_nodeInfo", "params": [], "id": 1 };

        try {
            const response = await fetch(this.rpc_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            return response.json();
        } catch (error) {
            console.error('Admin Node Info Error:', error);
        }

        return null;
    }

    async adminPeers() {
        const body = { "jsonrpc": "2.0", "method": "admin_peers", "params": [], "id": 1 };

        try {
            const response = await fetch(this.rpc_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            const data = await response.json();
            if (data.result) {
                return data.result;
            }
        } catch (error) {
            console.error('Admin Peers Error:', error);
        }

        return null;
    }

    async ethChainId() {
        const body = { "jsonrpc": "2.0", "method": "eth_chainId", "params": [], "id": 1 };

        try {
            const response = await fetch(this.rpc_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            const data = await response.json();
            if (data.result) {
                return parseInt(data.result, 16);
            }
        } catch (error) {
            console.error('Eth Chain ID Error:', error);
        }

        return null;
    }

    async ethGetBalance(address: string, block: string = 'latest') {
        const body = { "jsonrpc": "2.0", "method": "eth_getBalance", "params": [address, block], "id": 1 };

        try {
            const response = await fetch(this.rpc_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            const data = await response.json();
            if (data.result) {
                return parseInt(data.result, 16);
            }
        } catch (error) {
            console.error('Eth Get Balance Error:', error);
        }

        return null;
    }

    async txPoolBesuStatistics() {
        const body = { "jsonrpc": "2.0", "method": "txpool_besuStatistics", "params": [], "id": 1 };

        try {
            const response = await fetch(this.rpc_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            const data = await response.json();
            if (data.result) {
                return data.result.localCount + data.result.remoteCount;
            }
        } catch (error) {
            console.error('Tx Pool Besu Statistics Error:', error);
        }

        return null;
    }
}