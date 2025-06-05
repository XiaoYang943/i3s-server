FROM oven/bun:1 AS base
WORKDIR /usr/src/app
COPY . .
USER bun
RUN bun install
EXPOSE 3000/tcp
RUN bun run build
ENTRYPOINT [ "./server"]
