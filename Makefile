.PHONY: dev
dev:
	@echo "Running dev server..."
	@bunx --bun vite
	@echo "Dev container is running. Use Ctrl+C to stop."

.PHONY: test
test:
	@echo "Running tests..."
	@bun test
	@echo "Tests completed."

.PHONY: test-watch
test-watch:
	@echo "Running tests in watch mode..."
	@bun test --watch
	@echo "Tests are running in watch mode. Use Ctrl+C to stop."
