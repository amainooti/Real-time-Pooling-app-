import { Command } from 'commander';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { io, Socket } from 'socket.io-client';

@Injectable()
export class CliService implements OnModuleInit {
  private socket: Socket;
  private program: Command;

  constructor() {
    this.program = new Command();
    this.setupCommands();
  }

  onModuleInit() {
    this.connectWebSocket();
    this.startCli();
  }

  private connectWebSocket() {
    this.socket = io('http://localhost:3000');

    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    this.socket.on('onMessage', (data: any) => {
      console.log('Message received from server:', data);
    });
  }

  private setupCommands() {
    this.program
      .command('send <message>')
      .description('Send a message to the WebSocket server')
      .action((message: string) => {
        this.sendMessage(message);
      });

    this.program
      .command('exit')
      .description('Exit the CLI')
      .action(() => {
        console.log('Goodbye!');
        process.exit(0);
      });

    this.program.command('*').action((cmd) => {
      console.error(`Error: unknown command '${cmd}'`);
      this.program.help();
    });
  }

  private startCli() {
    console.log('CLI is ready. Type a command:');
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    process.stdin.on('data', (input) => {
      const trimmedInput = input.toString().trim();
      if (trimmedInput) {
        console.log('Received input:', trimmedInput);

        // Skip 'node' and script name
        const argv = trimmedInput.split(' ').filter((arg, index) => index >= 2);

        console.log('Simulated argv:', argv);
        this.program.parse(argv, { from: 'user' });
      }
    });
  }

  private sendMessage(message: string) {
    this.socket.emit('newMessage', message);
    console.log('Message sent:', message);
  }
}
