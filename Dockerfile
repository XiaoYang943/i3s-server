FROM oven/bun:1 AS base
WORKDIR /usr/src/app
COPY . .
RUN bun install --frozen-lockfile
RUN bun run build
EXPOSE 3000/tcp
ENTRYPOINT [ "./server"]
