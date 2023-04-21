from .server import server
from argparse import ArgumentParser
import logging

def main():
    parser = ArgumentParser(description="HTTP Language Server")
    server_methods = parser.add_mutually_exclusive_group()

    # Server methods
    server_methods.add_argument(
        "--stdio", help="start the server using stdio", action="store_true"
    )
    server_methods.add_argument(
        "--tcp", help="start the server using tcp", action="store_true"
    )

    # General arguments
    parser.add_argument("--silent", help="hide start log messages", action="store_true")
    parser.add_argument(
        "--debug", help="write debug logs to httpls.log file", action="store_true"
    )
    parser.add_argument(
        "--host",
        help="host <ip> address for tcp connection, default: 127.0.0.1",
        type=str,
        metavar="<ip>",
        default="127.0.0.1",
    )
    parser.add_argument(
        "--port",
        help="port <number> for tcp connection, default: 2087",
        type=int,
        metavar="<number>",
        default=2087,
    )

    args = parser.parse_args()

    if args.stdio:
        if not args.silent:
            print("HTTP Language Server now running in STDIO mode...")
            print("Press CTRL + C to stop.")

        if args.debug:
            logging.basicConfig(
                filename="httpls.log", level=logging.DEBUG, filemode="w"
            )

        server.start_io()

    elif args.tcp:
        if not args.silent:
            print("Sorry, this feature has not been implemented yet.")

        if args.debug:
            # logging.basicConfig(filename="httpls.log", level=logging.DEBUG, filemode="w")
            print(
                f"HTTP Language Server now running in TCP mode at {args.host}:{args.port}"
            )
            print("Press CTRL + C to stop.")

        # TODO: Implement the TCP server connection
        # server.start_tcp(args.host, args.port)
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
